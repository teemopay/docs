import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      // 文档标题
      title: "Teemopay Docs",
      // 用 logo 替换标题
      logo: {
        light: "/src/assets/logo-357.png",
        dark: "/src/assets/logo-371.png",
        replacesTitle: true,
      },
      // 头部信息
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/png",
            href: "/favicon.png",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "sitemap",
            href: "/sitemap-index.xml",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "google-site-verification",
            content: "-GfotMXI9T6QLKuRhihSibM-EpdU67vYtWdbK64UDr0",
          },
        },
      ],
      // 社交链接
      // social: {
      //   github: "https://github.com/teemopay/docs",
      // },
      // 为此网站设置英语为默认语言。
      defaultLocale: "en",
      // 默认语言
      locales: {
        en: {
          label: "English",
          lang: "en",
        },
        zh: {
          label: "中文",
          lang: "zh",
        },
      },
      // 侧边栏导航
      plugins: [
        starlightSidebarTopics([
          {
            label: {
              en: "Integration Guide",
              zh: "接入指南",
            },
            link: "/guides/getting-started",
            icon: "open-book",
            badge: { text: "READ", variant: "success" },
            items: ["guides/getting-started", "guides/changes", "guides/authentication"],
          },
          {
            label: {
              en: "🇲🇽 Mexico",
              zh: "🇲🇽 墨西哥",
            },
            link: "/mexico/payin/create",
            items: [
              {
                label: "Payin",
                translations: {
                  zh: "代收",
                },
                items: ["mexico/payin/create", "mexico/payin/callback", "mexico/payin/query"],
              },
              {
                label: "Payout",
                translations: {
                  zh: "代付",
                },
                items: ["mexico/payout/create", "mexico/payout/callback", "mexico/payout/query", "mexico/payout/bank"],
              },
              {
                label: "Inquire",
                translations: {
                  zh: "查询",
                },
                items: ["mexico/inquire/balance", "mexico/inquire/bill"],
              },
            ],
          },
          {
            label: {
              en: "🇵🇪 Peru",
              zh: "🇵🇪 秘鲁",
            },
            link: "/peru/payin/create",
            items: [
              {
                label: "Payin",
                translations: {
                  zh: "代收",
                },
                items: ["peru/payin/create", "peru/payin/callback", "peru/payin/query"],
              },
              {
                label: "Payout",
                translations: {
                  zh: "代付",
                },
                items: ["peru/payout/create", "peru/payout/callback", "peru/payout/query", "peru/payout/bank"],
              },
              {
                label: "Inquire",
                translations: {
                  zh: "查询",
                },
                items: ["peru/inquire/balance", "peru/inquire/bill"],
              },
            ],
          },
          {
            label: {
              en: "🇨🇴 Colombia",
              zh: "🇨🇴 哥伦比亚",
            },
            link: "/colombia/payin/create",
            items: [
              {
                label: "Payin",
                translations: {
                  zh: "代收",
                },
                items: ["colombia/payin/create", "colombia/payin/callback", "colombia/payin/query"],
              },
              {
                label: "Payout",
                translations: {
                  zh: "代付",
                },
                items: ["colombia/payout/create", "colombia/payout/callback", "colombia/payout/query", "colombia/payout/bank"],
              },
              {
                label: "Inquire",
                translations: {
                  zh: "查询",
                },
                items: ["colombia/inquire/balance", "colombia/inquire/bill"],
              },
            ],
          },
          {
            label: {
              en: "🇵🇰 Pakistan",
              zh: "🇵🇰 巴基斯坦",
            },
            link: "/pakistan/payin/create",
            items: [
              {
                label: "Cashier",
                translations: {
                  zh: "收银台",
                },
                items: ["pakistan/cashier/create", "pakistan/cashier/callback", "pakistan/cashier/query"],
              },
              {
                label: "Payout",
                translations: {
                  zh: "代付",
                },
                items: ["pakistan/payout/create", "pakistan/payout/callback", "pakistan/payout/query", "pakistan/payout/bank"],
              },
              {
                label: "Inquire",
                translations: {
                  zh: "查询",
                },
                items: ["pakistan/inquire/balance", "pakistan/inquire/bill"],
              },
            ],
          },
        ]),
      ],
      // 重新渲染组件
      components: {
        ContentPanel: "./src/components/ContentPanel.astro",
      },
      // 自定义 css
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({
      // 禁用默认的基础样式
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
