import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const sidebarGroup = (label, zh, items) => ({
  label,
  translations: {
    zh,
  },
  items,
});

const paymentSections = ({ payin, payout, inquire }) =>
  [
    payin && sidebarGroup("Payin", "代收", payin),
    payout && sidebarGroup("Payout", "代付", payout),
    inquire && sidebarGroup("Inquire", "查询", inquire),
  ].filter(Boolean);

const countryGroup = ({ label, zh, sections }) => sidebarGroup(label, zh, paymentSections(sections));

const countryGroups = {
  mexico: countryGroup({
    label: "🇲🇽 Mexico",
    zh: "🇲🇽 墨西哥",
    sections: {
      payin: ["mexico/payin/cashier_create", "mexico/payin/create", "mexico/payin/callback", "mexico/payin/query"],
      payout: ["mexico/payout/create", "mexico/payout/callback", "mexico/payout/query", "mexico/payout/bank"],
      inquire: ["mexico/inquire/balance", "mexico/inquire/bill"],
    },
  }),
  peru: countryGroup({
    label: "🇵🇪 Peru",
    zh: "🇵🇪 秘鲁",
    sections: {
      payin: ["peru/payin/create", "peru/payin/callback", "peru/payin/query"],
      payout: ["peru/payout/create", "peru/payout/callback", "peru/payout/query", "peru/payout/bank"],
      inquire: ["peru/inquire/balance", "peru/inquire/bill"],
    },
  }),
  colombia: countryGroup({
    label: "🇨🇴 Colombia",
    zh: "🇨🇴 哥伦比亚",
    sections: {
      payin: [
        "colombia/payin/cashier_create",
        "colombia/payin/direct_create",
        "colombia/payin/callback",
        "colombia/payin/query",
        "colombia/payin/bank",
        "colombia/payin/request_response",
      ],
      payout: ["colombia/payout/create", "colombia/payout/callback", "colombia/payout/query", "colombia/payout/bank"],
      inquire: ["colombia/inquire/balance", "colombia/inquire/bill"],
    },
  }),
  brazil: countryGroup({
    label: "🇧🇷 Brazil",
    zh: "🇧🇷 巴西",
    sections: {
      payin: ["brazil/payin/create", "brazil/payin/callback", "brazil/payin/query"],
      payout: ["brazil/payout/create", "brazil/payout/callback", "brazil/payout/query"],
      inquire: ["brazil/inquire/balance", "brazil/inquire/bill"],
    },
  }),
  chile: countryGroup({
    label: "🇨🇱 Chile",
    zh: "🇨🇱 智利",
    sections: {
      payin: ["chile/payin/create", "chile/payin/callback", "chile/payin/query"],
      payout: ["chile/payout/create", "chile/payout/callback", "chile/payout/query", "chile/payout/bank"],
      inquire: ["chile/inquire/balance", "chile/inquire/bill"],
    },
  }),
  argentina: countryGroup({
    label: "🇦🇷 Argentina",
    zh: "🇦🇷 阿根廷",
    sections: {
      payin: [
        "argentine/payin/cashier_create",
        "argentine/payin/create",
        "argentine/payin/callback",
        "argentine/payin/query",
        "argentine/payin/suspense_query",
        "argentine/payin/bankid_query",
        "argentine/payin/fix_order",
      ],
      payout: ["argentine/payout/create", "argentine/payout/callback", "argentine/payout/query", "argentine/payout/bank"],
      inquire: ["argentine/inquire/balance", "argentine/inquire/bill"],
    },
  }),
  pakistan: countryGroup({
    label: "🇵🇰 Pakistan",
    zh: "🇵🇰 巴基斯坦",
    sections: {
      payin: ["pakistan/payin/cashier_create", "pakistan/payin/direct_create", "pakistan/payin/callback", "pakistan/payin/query"],
      payout: ["pakistan/payout/create", "pakistan/payout/callback", "pakistan/payout/query", "pakistan/payout/bank"],
      inquire: ["pakistan/inquire/balance", "pakistan/inquire/bill"],
    },
  }),
  india: countryGroup({
    label: "🇮🇳 India",
    zh: "🇮🇳 印度",
    sections: {
      payin: ["india/payin/create", "india/payin/callback", "india/payin/query"],
      payout: ["india/payout/create", "india/payout/callback", "india/payout/query"],
      inquire: ["india/inquire/balance", "india/inquire/bill"],
    },
  }),
  indonesia: countryGroup({
    label: "🇮🇩 Indonesia",
    zh: "🇮🇩 印度尼西亚",
    sections: {
      payin: ["indonesia/payin/create", "indonesia/payin/callback", "indonesia/payin/query"],
      payout: ["indonesia/payout/create", "indonesia/payout/callback", "indonesia/payout/query", "indonesia/payout/bank"],
      inquire: ["indonesia/inquire/balance", "indonesia/inquire/bill"],
    },
  }),
  korea: countryGroup({
    label: "🇰🇷 Korea",
    zh: "🇰🇷 韩国",
    sections: {
      payin: ["korea/payin/create", "korea/payin/callback", "korea/payin/query", "korea/payin/kycbank"],
      payout: ["korea/payout/create", "korea/payout/callback", "korea/payout/query", "korea/payout/bank"],
      inquire: ["korea/inquire/balance", "korea/inquire/bill"],
    },
  }),
};

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
            items: [
              "guides/getting-started",
              "guides/changes",
              "guides/operation-manual",
              "guides/create-keys",
              "guides/authentication",
              "guides/timezone",
              "guides/technical-faq",
            ],
          },
          {
            id: "crypto",
            label: {
              en: "💰️ USDT",
              zh: "💰️ USDT",
            },
            link: "/crypto/payin/create",
            items: paymentSections({
              payin: ["crypto/payin/create", "crypto/payin/callback", "crypto/payin/query"],
              payout: ["crypto/payout/create", "crypto/payout/callback", "crypto/payout/query", "crypto/payout/bank"],
              inquire: ["crypto/inquire/balance", "crypto/inquire/bill"],
            }),
          },
          {
            id: "latin-america",
            label: {
              en: "🌎 Latin America",
              zh: "🌎 拉丁美洲",
            },
            link: "/mexico/payin/create",
            items: [
              countryGroups.mexico,
              countryGroups.peru,
              countryGroups.colombia,
              countryGroups.brazil,
              countryGroups.chile,
              countryGroups.argentina,
            ],
          },
          {
            id: "asia",
            label: {
              en: "🌏 Asia",
              zh: "🌏 亚洲",
            },
            link: "/pakistan/payin/cashier_create",
            items: [countryGroups.pakistan, countryGroups.india, countryGroups.indonesia, countryGroups.korea],
          },
        ]),
      ],
      // 重新渲染组件
      components: {
        Sidebar: "./src/components/Sidebar.astro",
        ContentPanel: "./src/components/ContentPanel.astro",
        TableOfContents: "./src/components/TableOfContents.astro",
        MobileTableOfContents: "./src/components/MobileTableOfContents.astro",
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
