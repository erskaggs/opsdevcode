const siteMetadata = {
    user: `erskaggs`,
    title: `OpsDev Code`,
    siteUrl: `https://opsdevco.de`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo.png`,
    icon: `/images/logo.png`,
    titleImage: `/images/wall.jpg`,
    introTag: `DevOps | AutoMation | Father`,
    description: `DevOps automation enthusiast but Father above all else.`,
    author: `@erskaggs`,
    blogItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: "HOME",
            url: "/"
        },
        {
            name: "ABOUT",
            url: "/about"
        },
        {
            name: "RESUME",
            url: "/resume"
        },
        {
            name: "BLOG",
            url: "/blog"
        },
        {
            name: "CONTACT",
            url: "/contact"
        }
    ],
    footerLinks: [
        {
            name: "PRIVACY POLICY",
            url: "/privacy-policy"
        },
        {
            name: "GitHub",
            url: "https://github.com/erskaggs/opsdevcode"
        }
    ],
    social: [
        {
            name: "Github",
            icon: "/images/github.svg",
            url: "https://github.com/erskaggs"
        },
        {
            name: "LinkedIn",
            icon: "/images/linkedin.svg",
            url: "https://www.linkedin.com/in/erskaggs/"
        },
        {
            name: "Twitter",
            icon: "/images/Twitter.svg",
            url: "https://twitter.com/erskaggs"
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "https://www.instagram.com/erskags/"
        }
    ],
    contact: {
        // apu_url is for contact form feature that I want to play around with later
        api_url: "",
        description: ``,
        mail: "eric@opsdevco.de",
        // Not sure if I want a phone number out there on the interwebs so leaving blank for now but wanted feature
        phone: "",
        address: "Everywhere, USA"
    }
};

const plugins = [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                "gatsby-remark-copy-linked-files",
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 1280
                    }
                }
            ]
        }
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `contents`,
            path: `${__dirname}/contents/`
        }
    },
    {
        resolve: `gatsby-plugin-less`,
        options: {
            strictMath: true
        }
    },
]

module.exports = {
    siteMetadata: siteMetadata,
    plugins: plugins
};
