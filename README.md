# We Were Here Tomorrow 语音排查首版

日期：2026-10-21。承接本对话“找新词 → 选定语音卡点 → 开干”的授权，制作本地可操作 MVP。英文 index.html、中文 zh.html，共用 style.css 和 app.js。独立目录，不修改已有网站。

## 范围与设计

给 PC 玩家和搭档使用；先区分系统麦克风异常、仅游戏内异常、明确语音服务器连接错误。首屏直接给出区分方法，三项症状按钮筛选对应清单，支持勾选进度、清空、分支互跳和查看全部。所有核心步骤保留在静态 HTML，关闭脚本仍可阅读。

采用浅色纸张、深绿与铁锈红的电台检查风格；原生 SVG 为原创抽象信号示意，不是实时连接检测。无需账号、付费接口、第三方素材、外部字体或网页麦克风权限。不采集录音。正式域名下使用 GA4 统计页面访问和首次点击排查按钮，不上传症状或勾选内容；本地预览不发送统计。

源码仓库：https://github.com/yxhtl/we-were-here-tomorrow-voice-check 。GitHub Pages 使用 main 分支的 docs/ 作为发布目录；英文正式网址为 https://yxhtl.github.io/we-were-here-tomorrow-voice-check/ ，中文为其下的 zh.html。两种语言的 canonical、hreflang 和 sitemap.xml 均指向该正式地址。GSC 所有权已通过 HTML 标签验证，sitemap 已提交；提交时抓取状态为无法抓取，但首页实时测试显示 Google 可访问且允许索引，尚未确认收录。GA4 独立资源 560438414，数据流 16190581422，测量 ID G-6SLM8QB63K；增强测量关闭，Cookie 限于本项目路径，广告个性化与 Google signals 关闭。统计后台收件结果以 proof/analytics 的验收证据为准。

## 需求与判断依据

- 本作 2026-10-20 发售；Steam 当天评价有麦克风随机失效、游戏中途语音停止的反馈。真实问题不等于已证实关键词搜索量。
- 2026-10-21 实查英文 Google、中文 Google 和百度，结果混有系列旧作。Google 为美国地区的个性化样本，不是大陆排名或全网低竞争证明。已有官方帮助和 AI 摘要，因此产品价值在于按症状分流，不能仅复制一篇通用教程。
- 已查近 90 天与 7 天 Google Trends；游戏名热度不能代表语音故障词流量。

## 内容来源

1. 微软：设置和测试麦克风 https://support.microsoft.com/en-us/windows/hardware/drivers/how-to-set-up-and-test-microphones-in-windows
2. 微软：麦克风权限与排查 https://support.microsoft.com/en-us/windows/hardware/drivers/fix-microphone-problems
3. Total Mayhem Games：本作 PC 音频 https://support.totalmayhemgames.com/hc/en-us/articles/34584077997725-My-sound-microphone-or-walkie-talkie-does-not-work-We-Were-Here-Tomorrow
4. Total Mayhem Games：本作 PC 连接 https://support.totalmayhemgames.com/hc/en-us/articles/34583628414365-Can-t-connect-to-the-voice-server-connection-failed-We-Were-Here-Tomorrow
5. 玩家评价 https://steamcommunity.com/app/2315050/reviews/?browsefilter=toprated
6. 发售新闻稿 https://www.gamespress.com/nl/We-Were-Here-Tomorrow-Is-Out-Now-on-Steam-PlayStation-5-and-Xbox-Serie

官方音频文章混有 Forever 及其他旧作文字，本页不照搬“取消连接提示就能继续”等未针对 Tomorrow 核实的办法。内容按官方资料整理，尚未进入游戏实测。不提供关闭安全防护、安装修改工具、统一开端口等一键“修复”，不将勾完清单解释为已经修好。

## 本地运行

在本目录运行 `node tools/serve.cjs`，打开 http://127.0.0.1:8770/zh.html 。服务只绑定本机，按白名单提供六个公开页面资源，不暴露 README、proof 或其他文件。

验收已通过：两种语言分别在 1440 和 390 宽度验证三分支、勾选计数与清空、分支互跳、未解决时的官方求助入口、全部步骤入口和无横向溢出。另通过语言互跳、键盘 Enter、答案深链接、禁用脚本时的完整内容、资源白名单、本地预览无外部请求和无页面脚本错误。已目视检查中英文桌面和中文手机截图。

测试脚本：`D:\codex workspace\网站项目\.codex-work\playwright-test-radio-check.cjs`。本机已有 Playwright 以后台模式运行，遵守不占用桌面鼠标和前台的要求。首次启动被沙箱阻止，获准在沙箱外执行后通过；未跳过浏览器验收。测试浏览器已关闭。明细为 proof/验收.json，截图也在 proof/，均被 .gitignore 排除。展示用的本机预览另行保留。

## 源码提交

本项目独立 Git 仓库使用 main 分支和 github HTTPS 远端。先运行 `bash release.sh` 预检，再用 `bash release.sh --push "中文提交说明"` 提交推送。未跟踪新文件须在 `--` 后逐个点名。脚本校验项目根目录、分支、固定远端、空暂存区、脚本语法和远端读取；不强推、不自动重试。每次运行都会生成并核对 docs/，只复制八个公开资源，不发布 README、工具脚本或验收目录。proof/ 和 node_modules/ 不提交。

GitHub Pages 启用后，推送 main 中的 docs/ 更新会触发自动部署。push 成功和网站部署成功需要分别核验；以 Pages 构建状态、对应提交和线上 HTTP/交互结果判断是否上线。
