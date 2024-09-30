/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "en",
  locales: ["en", "zh"],
  i18nextServer: {
    resources: {
      en: {
        translation: {
          "site": {
            "title": "Teemopay Docs",
            "description": "Teemopay Documentation"
          },
          "nav": {
            "start": "🙋 Start Integration",
            "menu": {
              "country": "🌍 Country",
              "mx": "🇲🇽 Mexico",
              "pe": "🇵🇪 Peru",
              "co": "🇨🇴 Colombia",
              "pk": "🇵🇰 Pakistan"
            }
          },
          "hero": {
            "title": "Documentation Center",
            "description": "Teemopay is a leading payment service provider in Latin America",
            "button": "Get Started",
            "button_outline": "View Website"
          },
          "counter": {
            "countText": "Count",
            "incrementButtonText": "Increment",
            "decrementButtonText": "Decrement"
          },
        },
      },
      zh: {
        "site": {
          "title": "Teemopay Docs",
          "description": "Teemopay 文档"
        },
        "nav": {
          "start": "🙋 快速接入",
          "menu": {
            "country": "🌍 选择国家",
            "mx": "🇲🇽 墨西哥",
            "pe": "🇵🇪 秘鲁",
            "co": "🇨🇴 哥伦比亚",
            "pk": "🇵🇰 巴基斯坦"
          }
        },
        "hero": {
          "title": "文档中心",
          "description": "Teemopay 是拉美地区优秀的支付服务提供商",
          "button": "快速接入",
          "button_outline": "查看官网"
        },
        "counter": {
          "countText": "计数",
          "incrementButtonText": "增加",
          "decrementButtonText": "减少"
        }
      },
    },
  },
};
