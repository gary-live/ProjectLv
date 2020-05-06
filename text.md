关于 rel=”noopener noreferrer”

在使用 ESlint 的时候发现，当使用新标签打开外部链接时候（target="_black"）， eslint-plugin-react 插件报出了错误：

Prevent usage of unsafe target='_blank' (react/jsx-no-target-blank)

查了下发现这是一个一直被忽视的很严重的安全问题。

危险的 target=”_blank”

假设在我们的这个页面（www.me.com）引入了外部的打开了外部的一个网页（www.out.com）：

<!-- <html lang="en">
<body>
  <a href="www.out.com" target="_blank">www.out.com</a>
</body>
</html>


<html lang="en">
<body>
  <script type="text/javascript">
    if (opener) {
      opener.window.location.href="www.danger.com";
    }
  </script>
</body>
</html> -->

然后在我们的网页点击超链接，打开外部网页（www.out.com），然后再切回来我们的网页，就会意外的发现我们的网页被篡改为其他网页（www.danger.com）

而且，打开的外部网页具有本网页的全部控制权，这意外着外部网页可以自由的获取本页面的 cookie、表单等敏感信息。

甚至，在跨域的情况下也生效， CORS 限制对此不起作用！！！

rel="noopener noreferrer"

破解也很简单，对于使用了 target="_blank" 并且跳转到外部链接的超链接，加上 rel="noopener noreferrer" 属性即可，此时外部链接获取到的 opener 为 null。

首先，rel="noopener" 可以确保 window.opener 为 null 在 Chrome 49+ 和 Opera 36，而对于旧版本浏览器和火狐浏览器，可以加上 rel="noreferrer" 更进一步禁用 HTTP 的 Referer 头，或者使用 js 打开新页面：

const safeOpen = url => {
  var otherWindow = window.open();
  otherWindow.opener = null;
  otherWindow.location = url;
}

总而言之，如果使用了 target="_blank" 打开外部页面，就必须加上 rel="noopener noreferrer" 属性以保证安全，特别地，对于由用户输入的链接（比如论坛，讨论等）更要做好拦截处理工作。