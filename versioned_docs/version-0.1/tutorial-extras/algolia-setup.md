---
sidebar_position: 4
---

# Algolia setup

### Algolia dashboard settings

-   Sign up for an account with [Algolia](https://www.algolia.com/users/sign_up)
-   Go to [dashboard](https://www.algolia.com/dashboard)
-   Click on API Keys ![Api Key](./img/apiKey.png)
-   Make note of the Application ID, we will need it ![App ID](./img/appId.png)
-   Click on All API Keys ![All API Keys](./img/allApiKeys.png)
-   Click on New API Key ![New API Key](./img/newApiKey.png)
-   Scroll to the bottom and add `addObject`, `deleteIndex` and `editSettings` to the ACL list
    and click on `Create` ![ACL](./img/acl.png)
-   Make note of the API Key, we will need it ![API Key](./img/apiKeyACL.png)
-   Now we need to create an index, click on search ![Search](./img/search.png)
-   Click on create index, give it the name index and click create ![Create Index](./img/createIndex.png)
-   We are done with Algolia dashboard settings 🎉️

### Docusaurus settings

Add below snippet with your credentials we noted above inside the themeConfig object

```js title=./docusaurus.config.js
algolia: {
    appId: "your_app_id",
    apiKey: "your_api_key",
    indexName: 'index',
    contextualSearch: true,
    searchParameters: {},
},
```

Make a file in the root directory called `config.json` and paste the below code in it. Replace the address with your own at the highlighted line. Leave `/sitemap.xml` at the end.

```json {3}
{
    "index_name": "index",
    "sitemap_urls": ["https://your_website.com/sitemap.xml"],
    "sitemap_alternate_links": true,
    "selectors": {
        "lvl0": {
            "selector": "(//ul[contains(@class,'menu__list')]//a[contains(@class, 'menu__link menu__link--sublist menu__link--active')]/text() | //nav[contains(@class, 'navbar')]//a[contains(@class, 'navbar__link--active')]/text())[last()]",
            "type": "xpath",
            "global": true,
            "default_value": "Documentation"
        },
        "lvl1": "header h1",
        "lvl2": "article h2",
        "lvl3": "article h3",
        "lvl4": "article h4",
        "lvl5": "article h5, article td:first-child",
        "lvl6": "article h6",
        "text": "article p, article li, article td:last-child"
    },
    "strip_chars": " .,;:#",
    "custom_settings": {
        "separatorsToIndex": "_",
        "attributesForFaceting": [
            "language",
            "version",
            "type",
            "docusaurus_tag"
        ],
        "attributesToRetrieve": [
            "hierarchy",
            "content",
            "anchor",
            "url",
            "url_without_anchor",
            "type"
        ]
    },
    "conversation_id": ["833762294"],
    "nb_hits": 46250
}
```

Also make a `.env` file at the root level of your project if you already don't have one and add your credentials in it.

```js title=./.env
APPLICATION_ID = your_app_id
API_KEY = your_app_key
```

We need install a small dependency called jq. Get it [here](https://stedolan.github.io/jq/download/)

Install docker from [here](https://www.docker.com/)

Finally, run the below command in a terminal at the path of your project root and you should now have an index! 🎉️

```bash
docker run -it --env-file=.env -e "CONFIG=$(cat ./config.json | jq -r tostring)" algolia/docsearch-scraper
```

Here's what the output should look like ![Output](./img/dockerResults.png)
