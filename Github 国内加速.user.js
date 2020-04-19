// ==UserScript==
// @icon         https://github.githubassets.com/favicon.ico
// @name         Github 镜像访问，加速下载
// @namespace    https://github.com/jadezi/github-accelerator/
// @version      1.0.4
// @description  GitHub 镜像，github 加速
// @author       jadezi
// @license      GPL License
// @match        *://github.com/*
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @resource     mycss https://gitee.com/jadezi/github-accelerator-css/raw/master/index.css
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    var clone = true;
    // var clone = false;
    var depth = true;
    // var depth = false;

    var loca = window.location.href;
    var mirror_url1 = 'https://' + 'github.com.cnpmjs.org';
    var mirror_url2 = 'https://' + 'hub.fastgit.org';
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
    <div class="user-ment">
    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">镜像网址</button>
    <div class="collapse multi-collapse" id="collapseExample">
    <div class="user-card user-card-body">
    <div class="user-alert user-alert-warning" role="alert">clone、depth命令的插入可手动编辑代码关闭</div>
    <div class="user-alert user-alert-danger" style="color: #721c24;background-color: #f8d7da;border-color: #f5c6cb;" role="alert">镜像地址请不要登陆自己的账户，造成损失本人概不负责</div>
    <div class="user-input-group user-mb-3">
    <div class="user-input-group-prepend"><span class="user-input-group-text" id="inputGroup-sizing-default">快速克隆1:</span></div>
    <input id="clone_case_1" type="text" value="${clone_utl1}" data-autoselect="" class="user-form-control" aria-label="将此存储库克隆到 ${clone_utl1}" readonly aria-describedby="inputGroup-sizing-default">
    <div class="user-input-group-append">
    <button class="btn btn-outline-secondary" type="button" id="button-copy1"  data-container="body" data-toggle="popover" data-placement="bottom" data-content="复制成功">复制</button>
    </div>
    <a type="button"  href="${web_url1}" class="btn">快速浏览1</a>
    </div>
    <div class="user-input-group user-mb-3">
    <div class="user-input-group-prepend">
    <span class="user-input-group-text" id="inputGroup-sizing-default">快速克隆2:</span>
    </div>
    <input id="clone_case_2" type="text" value="${clone_utl2}" data-autoselect="" class="user-form-control" aria-label="将此存储库克隆到 ${clone_utl2}" readonly aria-describedby="inputGroup-sizing-default" >
    <div class="user-input-group-append">
    <button class="btn btn-outline-secondary" type="button" id="button-copy2"  data-container="body" data-toggle="popover" data-placement="bottom" data-content="复制成功">复制</button>
    </div>
    <a type="button" href="${web_url2}" class="btn">快速浏览2</a>
    </div>
    <div class="user-input-group user-mb-3">
    <div class="user-input-group-prepend">
    <span class="user-input-group-text" id="inputGroup-sizing-default">快速克隆3:</span>
    </div>
    <input type="text" data-autoselect="" class="user-form-control" aria-describedby="inputGroup-sizing-default" value="不支持clone,直接跳转--->" aria-label="" readonly="" >
    <a type="button" href="${web_url3}" class="btn">快速浏览3</a>
    </div>
    </div>
    </div>
    </div>`;

    $('.repository-content').prepend(info);
    $('.release-entry').each(function () {
        $(this).find('.d-flex.Box-body>a').each(function () {
            var href = $(this).attr('href');
            var url1 = 'javascript:volid(0);'
            var url2 = mirror_url3 + href;
            var div1 = `<div class="user_download" style="display: flex;justify-content: flex-end;flex-grow: 1;"><div><a style="padding:4px;display:none"  class="btn user-btn-link"  href="${url1}" rel="nofollow">快速下载1</a></div><div><a style="padding:4px"   class="btn user-btn-link" href="${url2}" rel="nofollow">快速下载2(推荐)</a></div></div>`

            $(this).after(div1);
        });
        $(this).find('.d-block.Box-body>a').each(function () {
            var href = $(this).attr('href');
            var url1 = 'javascript:volid(0);'
            var url2 = mirror_url3 + href;
            var div1 = `<div class="user_download" style="display: flex;"><div><a style="padding:4px;display:none"  class="btn user-btn-link"  href="${url1}" rel="nofollow">快速下载1</a></div><div><a style="padding:4px"   class="btn user-btn-link" href="${url2}" rel="nofollow">快速下载2(推荐)</a></div></div>`

            $(this).after(div1);
        });
    });
    $('.get-repo-modal-options').each(function () {
        var url1 = mirror_url3 +'/'+a[3]+'/'+a[4]+ '/archive/master.zip';
        var span1 = `<a class="btn btn-outline get-repo-btn btn-block" rel="nofollow" href="${url1}">Fast Download ZIP</a>`;

        $(this).after(span1);
    });
    // 复制按钮
    $("#button-copy1").on('click',function(){
        GM_setClipboard($('#clone_case_1').val())
        alert("复制成功")
    })
    $("#button-copy2").on('click',function(){
        GM_setClipboard($('#clone_case_2').val())
        alert("复制成功")
    })
    GM_addStyle(GM_getResourceText('mycss'));
})();
