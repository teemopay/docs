---
title: 鉴权示例
description: 鉴权和加密说明
---

### 加密方式说明

- 签名算法: RSA
- 秘钥长度: 1024 位
- 签名方式: SHA1WithRSA

说明: 商户接入需先生成商户公钥(通过命令行或在线工具生成), 开通商户时生成平台公钥(用于交换公钥),
商户在后台应用列表中添加应用后进入设置, 然后点击"交换公钥"按钮以查看平台的公钥, 填写商户生成的公钥完成交换,
商户和平台使用各自的私钥进行加签, 各自使用对方公钥进行验签.

### 请求头验证&签名规则

1. 请求头中必须包含 nonce 和 timestamp
2. timestamp 如果商户发送当前时间戳和当前平台时间超过 30S, 则认为此请求已过期
3. 生成随机字符串 nonce, 24 小时内不能重复
4. 请求体字段名按照 ASCII 进行升序排序, 拼接为 a=1&b=2, 只对有值字段进行排序 (空值和空字符不参与加签)
5. 对排序结果后增加 nonce=123, 排序后为 a=1&b=2&nonce=123 
6. 使用私钥对 a=1&b=2&nonce=123 进行加签, 放入请求体中 sign 字段
7. 平台收到请求后会对 timestamp, nonce 和 sign 进行验签, 验证失败直接返回失败

平台回调商户会进行以上操作, 建议商户对参数进行加签

### 请求格式

不同接口请求参数不同,但所有请求参数中都应含有 sign 字段

### 请求头

| 字段         | 类型             | 必需 | 长度                                                   | 签名                                      |
| ------------ | ---------------- | ---- | ------------------------------------------------------ | ----------------------------------------- |
| Content-Type | application/json | yes  | 固定值.所有请求参数必须为 POST, 数据都必须放在 body 中 |
| app_code     | String           | yes  | 32                                                     | 分配给商户应用的 code                     |
| country      | String           | yes  | 2                                                      | MX-墨西哥 PE-秘鲁 CO-哥伦比亚 PK-巴基斯坦 |
| nonce        | String           | yes  | 32                                                     | 必须为 32 位不重复字符串                  |
| timestamp    | String           | yes  | 13                                                     | 当前时间戳(毫秒)                          |

### 响应格式

| 字段 | 类型   | 必需 | 描述     |
| ---- | ------ | ---- | -------- |
| code | Int    | yes  | 状态码   |
| msg  | String | yes  | 返回信息 |
| data | Object | no   | 返回数据 |

```java title=签名示例
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.Signature;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.*;

@Slf4j
public class SignUtils {

    public static void main(String[] args) throws Exception {
        // 替换成商户私钥
        String privateKey = "privateKey";
        String nonce = UUID.randomUUID().toString().replace("-", "");

        // 构建请求参数
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("merchantOrderNo", "TEST" + 1234567890);
        jsonObject.put("idCardNumber", "1234567890");
        jsonObject.put("realName", "TEST");
        jsonObject.put("amount", "1000");
        jsonObject.put("callbackUrl", "https://www.teemopay.com");
        jsonObject.put("paymentType", 1);
        jsonObject.put("email", "test@gmail.com");
        jsonObject.put("phone", "1234567890");

        // 计算签名
        String sign = signature(jsonObject, nonce, privateKey);
        jsonObject.put("sign", sign);

        log.info("nonce={},timestamp={},requestBody={}", nonce, System.currentTimeMillis(), jsonObject.toJSONString());
    }

    public static String signature(Map<String, Object> param, String nonce, String privateKey) throws Exception {
        // 计算SHA-1
        String signatureStr = paramHandler(param, nonce);
        log.debug("signatureStr = {}", signatureStr);
        return sign(signatureStr.getBytes(), privateKey, "SHA1WithRSA");
    }


    public static String sign(byte[] data, String privateKey, String arithmetic) throws Exception {
        byte[] keyBytes = Base64.getDecoder().decode(privateKey);
        PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PrivateKey privateK = keyFactory.generatePrivate(pkcs8KeySpec);
        Signature signature = Signature.getInstance(arithmetic);
        signature.initSign(privateK);
        signature.update(data);
        return Base64.getEncoder().encodeToString(signature.sign());
    }

    private static String paramHandler(Map<String, Object> param, String nonce) {
        Map<String, Object> sortedParameters = new TreeMap<>(param);
        // 构建参数字符串
        StringBuilder paramStringBuilder = new StringBuilder();
        for (Map.Entry<String, Object> entry : sortedParameters.entrySet()) {
            if ("sign".equals(entry.getKey())) {
                continue;
            }
            Object value = entry.getValue();
            if (Objects.isNull(value) || (value instanceof String && StringUtils.isBlank((String) value))) {
                continue;
            }
            paramStringBuilder.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
        }
        // 添加API密钥
        paramStringBuilder.append("nonce").append("=").append(nonce);
        return paramStringBuilder.toString();
    }

    // 验签
    public static boolean verifySign(Map<String, Object> param, String nonce, String publicKey) {
        String sign = (String) param.get("sign");
        if (StringUtils.isBlank(sign)) {
            log.error("请求参数缺少sign: {}", JSON.toJSONString(param));
            return false;
        }
        try {
            return verifySha1(paramHandler(param, nonce).getBytes(), publicKey, sign);
        } catch (Exception e) {
            log.error("RSA验签异常: {}", JSON.toJSONString(param), e);
            return false;
        }
    }

    public static boolean verifySha1(byte[] data, String publicKey, String sign) throws Exception {
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(org.apache.commons.codec.binary.Base64.decodeBase64(publicKey));
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PublicKey publicK = keyFactory.generatePublic(keySpec);
            Signature signature = Signature.getInstance("SHA1WithRSA");
            signature.initVerify(publicK);
            signature.update(data);
            return signature.verify(Base64.decodeBase64(sign));
        }
}
```
