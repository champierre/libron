# Libron

Libron は Amazon のページから素早く最寄りの図書館の蔵書を検索し、貸出予約ができる便利なツールです。

図書館蔵書検索サイト「[カーリル](http://calil.jp/)」の提供するAPIを利用することで、全国7400以上の図書館(1500館以上の[大学図書館](https://calil.jp/library/univ)を含む)に対応しています。

## インストール方法および使い方

[https://libron.net/](https://libron.net/)の「インストール方法」および「使い方」のページに従ってください。

## 歴史

- 2007/02/15 [Amazonに調布市立図書館の蔵書検索リンクを追加するGreasemonkeyスクリプト](https://blog.champierre.com/446)を作りました。
- 三鷹市立や世田谷区立など他の図書館にも対応
- 2009/09/10 [Libron - 無料で本が読めるライフハック](https://blog.champierre.com/858)という名前を付ける。
- 2010/04/13 [大幅リニューアル Libron 2.0 リリースしました！！](https://blog.champierre.com/893) カーリルAPIに対応し、対応図書館を一気に4300以上に。GitHubで公開していたソースを非公開にしました。
- 2019/03/28 GitHubで再びオープンソースで公開しました。

## 開発者向けの情報

バグを直したり、独自の機能を追加するために、Libronを自分の環境で動かしたい場合は、まずは「Clone or download」でソースコードをダウンロードします。ZIPをダウンロードした場合は解凍します。

Chromeのメニューで、[ウィンドウ] > [拡張機能]を選びます。すでにLibronの拡張機能をインストールしている場合は、「削除」をクリックして、Libronを外しておきます。

右上のスイッチでデベロッパーモードに変更し、「パッケージ化されていない拡張機能を読み込む」をクリックして、先程ダウンロードしたフォルダ以下、「chrome_extesion」以下の「libron」を選択します。

![extension](/images/extension.png)

以上でローカルにあるLibronが動くようになります。

ソースコート中のカーリルAPIキーは動作確認用にお使いください。もしこのプロジェクトをForkして動作させる場合には、[カーリルAPIの利用規約](https://calil.jp/doc/api_license.html)を確認した上で、[http://calil.jp/api/dashboard/](http://calil.jp/api/dashboard/)より自分のAPIキーを申請し、それを使うようにしてください。

## バグをみつけたら

https://libron.net/top/contact よりお問い合わせください。あるいは[Pull Request](https://github.com/champierre/libron/pulls)を送ってください。

## 独自の機能を追加したくなったら

[Pull Request](https://github.com/champierre/libron/pulls)を送っていただいてもいいのですが、まずは[Issues](https://github.com/champierre/libron/issues)でご相談ください。
