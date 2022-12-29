import {Parser} from 'html-to-react';

const MLHBannerComp = new Parser().parse(`<a id="mlh-trust-badge" style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000" href="https://mlh.io/eu?utm_source=eu-hackathon&utm_medium=TrustBadge&utm_campaign=2023-season&utm_content=blue" target="_blank"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2023/mlh-trust-badge-2023-blue.svg" alt="Major League Hacking 2023 Hackathon Season" style="width:100%"></a>`);
const MLHBanner = ()=>MLHBannerComp;
export default MLHBanner;