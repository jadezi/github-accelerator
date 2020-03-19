// ==UserScript==
// @icon            https://github.githubassets.com/favicon.ico
// @name         Github 国内加速，下载加速
// @namespace    https://github.com/jadezi
// @version      1.1.2
// @description  GitHub加速
// @author       jadezi
// @match        *://github.com/*
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    var clone = true;
    // var clone = false;
    var depth = true;
    // var depth = false;

    var loca = window.location.href;
    var mirror_url1 = 'https://' + 'github.com.cnpmjs.org';
    var mirror_url2 = 'http://' + 'github-mirror.bugkiller.org';
    var mirror_url3 = 'https://' + 'github.wuyanzheshui.workers.dev';
    var str1 = '';

    if (clone) {
        str1 += "git clone ";
        if (depth) {
            str1 += "--depth=1 ";
        }
    }

    var a = loca.split("/");
    var str2 = '/' + a[3] + '/' + a[4] + '.git';
    var clone_utl1 = str1 + mirror_url1 + str2;
    var clone_utl2 = str1 + mirror_url2 + str2;
    var str3 = window.location.pathname;
    var web_url1 = mirror_url1 + str3;
    var web_url2 = mirror_url2 + str3;
    var web_url3 = mirror_url3 + str3;
    var info = `
<div style="margin-bottom: 1rem;">
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">镜像网址</button>
<div class="collapse multi-collapse" id="collapseExample">
<div style="-ms-flex: 1 1 auto;flex: 1 1 auto;min-height: 1px;padding: 1.25rem;position: relative;display: -ms-flexbox;display: flex;-ms-flex-direction: column;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(0, 0, 0, .125);border-radius: .25rem;margin-top:0.2rem">
<div style="color: #856404;background-color: #fff3cd;border-color: #ffeeba;padding: .75rem 1.25rem;margin-bottom: 1rem;border: 1px solid transparent;border-radius: .25rem;" role="alert">
clone、depth命令的插入可手动编辑代码关闭
</div>
<div style="margin-bottom: 1rem!important;position: relative;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;-ms-flex-align: stretch;align-items: stretch;width: 100%;">
<div style="display: -ms-flexbox;display: flex;">
<span  id="inputGroup-sizing-default" style="display: -ms-flexbox;display: flex;-ms-flex-align: center;align-items: center;padding: .375rem .75rem;margin-bottom: 0;font-size: 1rem;font-weight: 400;line-height: 1.5;color: #495057;text-align: center;white-space: nowrap;background-color: #e9ecef;border: 1px solid #ced4da;border-radius: .25rem;">快速克隆1:</span></div>
<input id="clone_case_1" type="text" value="${clone_utl1}" data-autoselect=""  style="display: block;width: 100%;padding: .375rem .75rem;font-size: 1rem;font-weight: 400;line-height: 1;border: 1px solid #ced4da;border-radius: .25rem;position: relative;-ms-flex: 1 1 0%;flex: 1 1 0%;min-width: 0;margin-bottom: 0;" aria-label="将此存储库克隆到 ${clone_utl1}" readonly aria-describedby="inputGroup-sizing-default">
<a type="button"  href="${web_url1}" class="btn">快速浏览1</a>
</div>
<div style="margin-bottom: 1rem!important;position: relative;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;-ms-flex-align: stretch;align-items: stretch;width: 100%;">
<div style="display: -ms-flexbox;display: flex;">
<span id="inputGroup-sizing-default"  style="display: -ms-flexbox;display: flex;-ms-flex-align: center;align-items: center;padding: .375rem .75rem;margin-bottom: 0;font-size: 1rem;font-weight: 400;line-height: 1.5;color: #495057;text-align: center;white-space: nowrap;background-color: #e9ecef;border: 1px solid #ced4da;border-radius: .25rem;">快速克隆2:</span>
</div>
<input id="clone_case_2" type="text" value="${clone_utl2}" data-autoselect=""  style="display: block;width: 100%;padding: .375rem .75rem;font-size: 1rem;font-weight: 400;line-height: 1;border: 1px solid #ced4da;border-radius: .25rem;position: relative;-ms-flex: 1 1 0%;flex: 1 1 0%;min-width: 0;margin-bottom: 0;" aria-label="将此存储库克隆到 ${clone_utl2}" readonly aria-describedby="inputGroup-sizing-default" >
<a type="button" href="${web_url2}" class="btn">快速浏览2</a>
</div>
<div style="margin-bottom: 1rem!important;position: relative;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;-ms-flex-align: stretch;align-items: stretch;width: 100%;" >
<div style="margin-right:-1px;display: -ms-flexbox;display: flex;">
<span id="inputGroup-sizing-default"  style="display: -ms-flexbox;display:flex;-ms-flex-align: center;align-items: center;padding: .375rem .75rem;margin-bottom: 0;font-size: 1rem;font-weight: 400;line-height: 1.5;color: #495057;text-align: center;white-space: nowrap;background-color: #e9ecef;border: 1px solid #ced4da;border-radius: .25rem;">快速克隆3:</span>
</div>
<input type="text" data-autoselect="" style="display: block;width: 100%;padding: .375rem .75rem;font-size: 1rem;font-weight: 400;line-height: 1;border: 1px solid #ced4da;border-radius: .25rem;position: relative;-ms-flex: 1 1 0%;flex: 1 1 0%;min-width: 0;margin-bottom: 0;" aria-describedby="inputGroup-sizing-default" value="不支持clone,直接跳转--->" aria-label="" readonly="" >
<a type="button" href="${web_url3}" class="btn">快速浏览3</a>
</div>
</div>
</div>

</div>
`;
    // 镜像仓库ui
    $('.repository-content').prepend(info);
    $('.release-entry').each(function () {
        $(this).find('.d-flex.Box-body>a').each(function () {
            var href = $(this).attr('href');
            var url1 = mirror_url2 + href;
            var url2 = mirror_url3 + href;
            var div1 = `<div class="user_download" style="display: flex;justify-content: flex-end;flex-grow: 1;"><div><a style="padding:4px"  class="btn user-btn-link"  href="${url1}" rel="nofollow">快速下载1</a></div><div><a style="padding:4px"   class="btn user-btn-link" href="${url2}" rel="nofollow">快速下载2</a></div></div>`

            $(this).after(div1);
        });
        $(this).find('.d-block.Box-body>a').each(function () {
            var href = $(this).attr('href');
            var url1 = mirror_url2 + href;
            var url2 = mirror_url3 + href;
            var div1 = `<div class="user_download" style="display: flex;"><div><a style="padding:4px"  class="btn user-btn-link"  href="${url1}" rel="nofollow">快速下载1</a></div><div><a style="padding:4px"   class="btn user-btn-link" href="${url2}" rel="nofollow">快速下载2</a></div></div>`

            $(this).after(div1);
        });
    });
    // release 下载界面按钮优化
    $('.get-repo-modal-options').each(function () {
        $(this).find('.btn-block,.js-anon-download-zip-link').each(function () {
            var href = $(this).attr('href');
            var url1 = mirror_url3 + href;
            var span1 = `<a class="btn btn-outline get-repo-btn btn-block" rel="nofollow" href="${url1}">Fast Download ZIP</a>`;

            $(this).after(span1);
        });
    });
})();