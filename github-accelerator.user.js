// ==UserScript==
// @name         Github 镜像访问，加速下载
// @icon         https://github.githubassets.com/favicon.ico
// @namespace    https://github.com/jadezi/github-accelerator/
// @version      2.0.3
// @description  GitHub 镜像，github 加速
// @author       jadezi、wuyuehui
// @license      GPL License
// @match        *://github.com/*
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @resource     customStyles https://gitee.com/jadezi/github-accelerator-css/raw/master/index.css
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// ==/UserScript==

(function () {
    const clone_url_list = [
        {
            name: '地址1',
            url: 'https://hub.fastgit.xyz',
        },
        {
            name: '地址2',
            url: 'https://hub.0z.gs',
        },
        {
            name: '地址3',
            url: 'https://api.mtr.pub',
        },
    ]

    const download_url = [
        'https://mirror.ghproxy.com',
        'https://gh-proxy.du33169.workers.dev',
    ]

    function init() {
        initMirrorUrl()
        addPanel()
        setTimeout(addDownload, 2000);
        addRelease()
    }

    // 初始化镜像地址
    function initMirrorUrl() {
        const _clone_url_list = clone_url_list.map(mirrorItem => {
            const [clone_url, quick_look_url] = joinCloneMirrorUrl(mirrorItem)
            return {
                clone_url,
                quick_look_url,
            }
        })
        console.log('%c [ _clone_url_list ]', 'font-size:13px; background:pink; color:#bf2c9f;', _clone_url_list)
        GM_setValue('clone_url_list', _clone_url_list)
    }

    // 拼接克隆地址
    const joinCloneMirrorUrl = (mirrorItem) => {
        const { url } = mirrorItem
        let commonUrl = ''
        commonUrl += "git clone ";
        commonUrl += url;
        const pathnameArr = window.location.pathname.split('/');
        let clone_url = commonUrl + '/' + pathnameArr[1] + '/' + pathnameArr[2] + '.git'
        let quick_look_url = url + '/' + pathnameArr[1] + '/' + pathnameArr[2]
        return [clone_url, quick_look_url]
    }

    // 初始化镜像面板
    function addPanel() {
        const clone_url_list = GM_getValue('clone_url_list')
        // 镜像面板模板
        const mirror_template = `
        <div class="mirror-panel clearfix container-xl px-3 px-md-4 px-lg-5 mt-4">
            <div class="mb-1">
                <button class="btn btn-primary" type="button" id="mirror-btn">镜像网址</button>
            </div>
            <div class="collapse multi-collapse" id="collapse">
                <div class="user-card user-card-body">
                    <div class="user-alert user-alert-warning" role="alert">clone、depth命令的插入可手动编辑代码关闭</div>
                    <div class="user-alert user-alert-danger" role="alert">镜像地址请不要登陆自己的账户，造成损失本人概不负责</div>
                    <!-- 插入克隆模板列表位置 -->
                </div>
            </div>
        </div>
        `
        // 获取克隆地址模板
        const get_clone_template = (mirrorItem, index) => {
            const { clone_url, quick_look_url } = mirrorItem
            return `
            <div class="mb-3">
                <div class="h5 mb-1">克隆地址${index + 1}</div>
                <div class="input-group">
                    <input type="text" class="form-control input-monospace input color-bg-subtle" value="${clone_url}"
                        aria-label="${clone_url}">
                    <div class="input-group-button">
                        <clipboard-copy value="${clone_url}" aria-label="Copy to clipboard"
                            class="btn js-clipboard-copy ClipboardButton" data-copy-feedback="Copied!" role="button" style="border-left:0;border-radius:0">
                            复制
                        </clipboard-copy>
                    </div>
                    <div class="input-group-button">
                        <button class="btn quick_look" type="button" data-url="${quick_look_url}" data class="btn">快速浏览</button>
                    </div>
                </div>
            </div>
            `
        }

        // 克隆模板数组
        const clone_template_List = clone_url_list.map((mirrorItem, index) => {
            return get_clone_template(mirrorItem, index)
        })

        $(".repository-content").prepend(mirror_template);

        clone_template_List.forEach(template => {
            $(".user-card-body").append(template);
        });

        // 隐藏面板
        $("#mirror-btn").on("click", () => {
            togglePanelVisible()
        })

        // 快速浏览
        $(".quick_look").on("click", (e) => {
            const quick_look_url = e.target.dataset.url
            window.open(quick_look_url)
        });

        initPanelVisible()
    }

    // 初始化镜像面板状态，根据上一次状态显示
    function initPanelVisible() {
        const currentPanelVisible = GM_getValue('panelVisible')
        if (currentPanelVisible === true) {
            $("#collapse").show();
        } else {
            $("#collapse").hide();
        }
    }

    // Download ZIP
    function addDownload() {
        const clone_url_list = GM_getValue('clone_url_list')

        const get_download_template = (mirrorItem, index) => {
            const { quick_look_url } = mirrorItem
            let download_url = quick_look_url + "/archive/master.zip";
            return `
            <li class="Box-row Box-row--hover-gray p-3 mt-0">
                <a class="d-flex flex-items-center color-fg-default text-bold no-underline" href=${download_url}>
                    Fast Download ZIP(下载地址${index + 1})
                </a>
            </li>
            `
        }

        const download_template_list = clone_url_list.map((mirrorItem, index) => {
            return get_download_template(mirrorItem, index)
        })

        download_template_list.forEach(template => {
            $(".dropdown-menu.dropdown-menu-sw.p-0 ul").append(template)
        });
    }

    // Release
    function addRelease() {
        $(".Box .Box-footer").each(function () {
            $(this).find("li.Box-row").each(function () {
                const href = $(this).find("a")[0].href
                const li_obj= $(this)
                const download_url1 = `${download_url[0]}/${href}`
                const download_url2 = `${download_url[1]}/${href}`
                let download_template = `
                <div class="mt-1" style="display: flex; float: right;position: relative;top: -10px;left: 10px;">
                    <a class="btn btn-sm mr-1" href="${download_url1}" rel="nofollow">快速下载1</a>
                    <a class="btn btn-sm" href="${download_url2}" rel="nofollow">快速下载2</a>
                </div>
                `
                li_obj.children('span.float-right').before(download_template);
                if(li_obj.children('span.float-right').length<1){
                    li_obj.children('a').before(download_template);
                }
            });
        });
    }

    // 切换面板显示隐藏
    function togglePanelVisible() {
        const currentPanelVisible = GM_getValue('panelVisible')
        if (currentPanelVisible === true) {
            $("#collapse").hide();
        } else {
            $("#collapse").show();
        }
        GM_setValue('panelVisible', !currentPanelVisible)
    }


    // 注册菜单
    GM_registerMenuCommand(`【🔔显示 & 隐藏 - 镜像信息面板】`, togglePanelVisible)
    GM_registerMenuCommand(`【📢意见 & 反馈】`, () => { window.GM_openInTab('https://github.com/jadezi/github-accelerator/issues/new', { active: true, insert: true, setParent: true }); })

    // 设置自定义样式
    GM_addStyle(GM_getResourceText("customStyles"));

    // 初始化
    init()
})();
