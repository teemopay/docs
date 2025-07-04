import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.teemopay.com",
  integrations: [
    starlight({
      // 文档标题
      title: "Teemopay Docs",
      // 禁用 404 页面
      disable404Route: true,
      // 用 logo 替换标题
      logo: {
        light: "/src/assets/light-logo.svg",
        dark: "/src/assets/dark-logo.svg",
        replacesTitle: true,
      },
      // 头部信息
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/svg+xml",
            href: "/favicon.svg",
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
            id: "integration-guide",
            label: {
              en: "Integration Guide",
              zh: "接入指南",
            },
            link: "/guides/getting-started",
            icon: "open-book",
            badge: { text: "READ", variant: "success" },
            items: ["guides/getting-started", "guides/changes", "guides/operation-manual", "guides/create-keys", "guides/authentication"],
          },
          {
            id: "crypto",
            label: {
              en: "💰️ USDT",
              zh: "💰️ USDT",
            },
            link: "/crypto/payin/create",
            items: [
              {
                label: "Payin",
                translations: {
                  zh: "代收",
                },
                items: ["crypto/payin/create", "crypto/payin/callback", "crypto/payin/query"],
              },
              {
                label: "Payout",
                translations: {
                  zh: "代付",
                },
                items: ["crypto/payout/create", "crypto/payout/callback", "crypto/payout/query", "crypto/payout/bank"],
              },
              {
                label: "Inquire",
                translations: {
                  zh: "查询",
                },
                items: ["crypto/inquire/balance", "crypto/inquire/bill"],
              },
            ],
          },
          {
            id: "mexico",
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
                items: ["mexico/payin/cashier_create", "mexico/payin/create", "mexico/payin/callback", "mexico/payin/query"],
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
            id: "peru",
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
            id: "colombia",
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
            id: "pakistan",
            label: {
              en: "🇵🇰 Pakistan",
              zh: "🇵🇰 巴基斯坦",
            },
            link: "/pakistan/payin/cashier_create",
            items: [
              {
                label: "payin",
                translations: {
                  zh: "代收",
                },
                items: ["pakistan/payin/cashier_create", "pakistan/payin/direct_create","pakistan/payin/callback", "pakistan/payin/query"],
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
          {
            id: "brazil",
            label: {
              en: "🇧🇷 Brazil",
              zh: "🇧🇷 巴西",
            },
            link: "/brazil/payin/create",
            items: [
              {
                label: "Payin",
                translations: {
                  zh: "代收",
                },
                items: ["brazil/payin/create", "brazil/payin/callback", "brazil/payin/query"],
              },
              {
                label: "Payout",
                translations: {
                  zh: "代付",
                },
                items: ["brazil/payout/create", "brazil/payout/callback", "brazil/payout/query"],
              },
              {
                label: "Inquire",
                translations: {
                  zh: "查询",
                },
                items: ["brazil/inquire/balance", "brazil/inquire/bill"],
              },
            ],
          },
          {
            id: "indonesia",
            label: {
              en: "🇮🇩 indonesia",
              zh: "🇮🇩 印尼",
            },
            link: "/indonesia/payin/create",
            items: [
              {
                label: "Payin",
                translations: {
                  zh: "代收",
                },
                items: ["indonesia/payin/create", "indonesia/payin/callback", "indonesia/payin/query"],
              },
              {
                label: "Payout",
                translations: {
                  zh: "代付",
                },
                items: ["indonesia/payout/create", "indonesia/payout/callback", "indonesia/payout/query", "indonesia/payout/bank"],
              },
              {
                label: "Inquire",
                translations: {
                  zh: "查询",
                },
                items: ["indonesia/inquire/balance", "indonesia/inquire/bill"],
              },
            ],
          },
          {
            id: "chile",
            label: {
              en: "🇨🇱 chile",
              zh: "🇨🇱 智利",
            },
            link: "/chile/payin/create",
            items: [
              {
                label: "Payin",
                translations: {
                  zh: "代收",
                },
                items: ["chile/payin/create", "chile/payin/callback", "chile/payin/query"],
              },
              {
                label: "Payout",
                translations: {
                  zh: "代付",
                },
                items: ["chile/payout/create", "chile/payout/callback", "chile/payout/query", "chile/payout/bank"],
              },
              {
                label: "Inquire",
                translations: {
                  zh: "查询",
                },
                items: ["chile/inquire/balance", "chile/inquire/bill"],
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
