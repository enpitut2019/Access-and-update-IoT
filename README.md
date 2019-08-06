## プロダクト名


アクセス制御と自動アップデート
## エレベーターピッチ

開発者(ベンダー)がIoT機器のモデルに応じた脆弱性の有無の情報をブロックチェーン上に置くことで,誰でも危険な機器を確認することができる。

その情報を元にモデルごとの脆弱性情報に対応した自動アクセス制限を実現した。

今回の想定している登場人物は4人で
・vender
・admin
・camera
・smart phone

それぞれの役割
vender
・脆弱性のあるモデルのアップ
・ファームウェアのアップデート
admin
・IoTデバイス間のアクセス制御
->グループを作成する
->管理下のデバイス間のアクセス制御
->デバイスの脆弱性に応じたアクセス制御

camera
・グループに参加する処理
smart phone
・カメラへのアクセスのリクエスト

# 想定例

例えば,自分のスマホから閲覧できる監視カメラに脆弱性が見つかり,それに応じてベンダーがブロックに置いているカメラの脆弱性情報を更新すればスマホからカメラへアクセスすることはできなくなり,危険な通信を回避できる。逆にカメラからスマホにアクセスすることもできない。

# 利点
・public blockchainによってモデルの最新情報を得られる
・アクセス制御のルールの改ざんが困難
・ある時刻でのデバイスの状態が保証される


# 仕様環境
METAMASKのインストール(chrome 拡張機能)
<!-- 
# 使用の流れ
・Admin,Vender,camera,smart phoneのアカウントを作成
・AdminのアカウントでGroupを作成する
・camera,smart phoneをグループに追加する(Addressを入力)
・アカウントを切り替えて,adminのグループに参加するリクエストを送る(adminのアドレス,任意のmodel名)
・Adminのアカウントでグループ内のデバイスのアドレス一覧,modelのハッシュ値一覧を確認できる
・smart phoneのアドレスに切り替えて,cameraにアクセスする
->どちらもグループに属していれば許可される
・vender側で危険なモデルを登録する
・↑の処理をしようとすると危険なデバイスとしてアクセスを弾く -->


## メンバー

市野　樹也

福田　竜央

## デプロイ先URL