// =========================================================
// 0. サウンドファイルと画像ファイルパス / グローバル定数
// =========================================================
const TYPE_SOUND_PATH = 'se_voice_sans.mp3';
const DAMAGE_SOUND_PATH = 'se_damage.mp3';
const SHATTER_SOUND_PATH = 'se_shatter.mp3';
const SAVEPOINT_SOUND_PATH = 'se_savepoint.mp3';

const BIRDS_BGM_PATH = 'mus_birdnoise.ogg';
const CHOKEDUP_BGM_PATH = 'mus_chokedup.ogg';
const SLASH_SOUND_PATH = 'se_slash.mp3';
const STRIKE_SOUND_PATH = 'se_strike.mp3';
const KILL_SOUND_PATH = 'se_kill.mp3'; // ★使用するSE
const HEAL_SOUND_PATH = 'se_heal.mp3'; 
const MEGALOVANIA_PATH = 'megalovania.ogg';
const GAMEOVER_BGM_PATH = 'gameover.ogg';
const GAMEOVER_IMAGE_PATH = 'gameover.jpg';

// ★修正点1-1: スキップ用の音声ファイルを定義★
const SKIP_SOUND_PATH = 'se_text.mp3'; 

// ★修正点4-1: アニメーション用の画像パスとイベント時間を定義★
const SANS_SLASH_IMAGE_PATH = 'sans_slash.gif';
const SANS_STRIKE_IMAGE_PATH = 'sans_strike.gif';
// index 117 イベントの正確なタイミング定義
const DELAY_BEFORE_SLASH = 1000;      // 完了からSLASH開始まで 1.0秒
const SLASH_TO_STRIKE_DELAY = 1500;   // SLASH開始からSTRIKE開始まで 1.5秒
const STRIKE_TO_NEXT_DELAY = 5500;    // STRIKE開始から次の問題移行まで 5.5秒


const MAX_HP_INITIAL = 92; 
const MAX_HP_AFTER_CLEAR = 99; // ★クリア後の最大HP
const BGM_VOLUME = 0.5; 

let startTime = 0;
let timeInterval = null;
let elapsedTime = 0; // 経過時間（ミリ秒）

// ... 既存の要素の取得
const timeValueElement = document.getElementById('time-value'); // ★追加★



// =========================================================
// 0.5. HP画像ファイルマッピング (新規追加)
// =========================================================
const HP_IMAGE_MAP = {
    '0': 'hp_0.gif',
    '1': 'hp_1.gif',
    '2': 'hp_2.gif',
    '3': 'hp_3.gif',
    '4': 'hp_4.gif',
    '5': 'hp_5.gif',
    '6': 'hp_6.gif',
    '7': 'hp_7.gif',
    '8': 'hp_8.gif',
    '9': 'hp_9.gif',
    '/': 'hp_s.gif'
};


// =========================================================
// 1. セリフの配列 / 読み仮名 (変更なし)
// =========================================================
const sansDialogues = [
    "今日は ステキな日だ", "花が 咲いてる 小鳥たちが さえずってる", "こんな日には お前みたいな ヤツは...", "地獄で 燃えて しまえば いい", "ハハ...", "いつも思ってたんだ", "なんで みんな最初に 必殺技を 使わないんだろうって", "え？", "まさか おとなしく くらうとでも 思ったか？", "時空に大規模な歪みが発生しているらしい", "時間の流れがメチャクチャに とんで...", "止まって...", "また動いて", "そして突然 すべてが終わりを 迎えるんだ", "ヘヘヘ...", "それって お前の仕業なんだろ？", "おまえには わからないんだろうな", "ある日 突然 なんの 前触れもなく...", "なにもかもが リセットされる...", "それを 知りながら 生きていく 気持ちなんて", "オレは とっくにあきらめた", "もう 地上に 戻りたいと 思う ことも なくなった", "だって もし 戻れたって...", "すぐに また ここへ 戻されるんだろ？", "記憶を 消されてさ", "そんなだから...", "正直 何をやっても やる気が 出ない", "...ま それも 怠けるための 口実なのかも しれないけどな", "自分でも よく わからないよ", "ただ ひとつ わかるのは...", "このあと 何が 起きるか 知っている以上...", "もう 何もしないで 見ている わけには いかないってことさー", "ま それは さておき...", "お前 ホントに 武器を 振り回すの 好きだな", "...", "なぁ", "お前 さっきは こたえて くれなかったけど...", "オレには わかるよ", "お前の中には 正義のココロの かけらが ある", "正しいことを 望んだヤツの 記憶が あるはずだ", "ひょっとして オレたち...", "別の 時間軸では...", "友達 だったんじゃ ないのか？", "なぁ こたえてくれよ", "オレのこと おぼえてるのか？", "オレの 言ってることの 意味が わかるなら...", "こんなの もう やめようぜ？", "武器を 置いてくれよ そしたら...", "オレの 仕事も ラクになる", "ま 一応 言ってみただけだ", "そっちが やめる気 ないなら しかたない", "実はさ オレ こっそり思ってたんだ", "お前と 友達に なれないかなって", "時空が 歪むのは 誰かが 不満を 感じてるからかも しれない...ってな", "だから その不満を 解消してやれば", "ゆがまなく なるかもって 思ったんだ", "どうすれば 不満が 解消 されるのかは わからないけど...", "ウマいメシとか くだらないギャグとか", "友達とかが あれば いいのかなってさ", "...笑えるだろ？", "そう お前は 何を やっても 絶対に 満足なんて しないのにな", "何度も 何度も 時間軸を 食い荒らして...", "そして最後は...", "......", "...なぁ", "これだけは 忠告 しておく", "お前も いつかは...", "「やめる」選択を しなきゃ いけなく なるんだ", "そして...今日が その時だ", "だって...", "闘いっぱなしで オレは もう ヘトヘトだよ", "これ以上 やるつもりなら...", "スペシャル攻撃を 使わないと いけなくなる", "そう オレの スペシャル攻撃...どこかで 聞いたこと あるか？", "覚悟しなよ...次の 攻撃の あとで 発動 するから", "それが 嫌なら 今のうちに 死んだほうが 良い", "はぁ しょうがないな...", "じゃ いくぞ？", "この 攻撃をのり切ったら オレの スペシャル攻撃が 炸裂するからな", "ハァ...ハァ...", "仕方ないな...", "それじゃ ホントに スペシャル攻撃を おみまいするからな", "覚悟は いいか？", "おどろくなよ...", "どうだ？", "「おどろくな」って 言っただろ？", "そう スペシャル攻撃 なんて ないんだ", "いくら 待っても 何も おこらないよ", "へへへ...驚くわけ ないよな？", "そう お前を倒すなんて オレには ムリなんだ", "お前のターンに なったら...", "いつかは殺される", "それで...", "思いついたんだよ...", "お前のターンに ならなきゃ 良いって", "だから お前が 諦めるまで オレのターンを 続けることにした", "ここで ふたり 永久に 闘い続けることに なってもな", "わかったか？", "ここにいても タイクツする だけだ", "っていうか もう タイクツ してきたんじゃないか？", "タイクツしたら お前は 「やめる」だろ？", "知ってるよ...お前みたいな ヤツのことは...", "「ケツイが かたい」 ...っていうんだろ？", "何が あっても 絶対に 諦めようと しないんだ...", "頑張ったところで 良いことなんて ひとつも ないのにさ", "どれだけ ハッキリ 言ってやっても...", "やめようとしない", "良いか 悪いか なんて 関係ないんだよな？", "「できる」ってだけで やろうとするんだ", "そう... 「できる」って だけで...", "...やらずにはいられないんだ", "だけど 今度こそ ホントに 終わりだぜ", "これ以上は 何もない", "だから オレから 言えることは ひとつだけ", "お前は その 強い「ケツイ」で...", "すっぱり 諦めることだ", "そして...ふああぁぁ...何か別のことでも するんだな", "おーっと そうは とんやが...", "...", "...", "...", "ハハ...", "どうやら ここまで みたいだな", "...", "いいかい...？", "オレは とめたからな？", "んじゃ...", "グリルビーズにでも 行くかな", "パピルス お前も 腹 減ってるか？"
];

const sansReadings = [
    "きょうはすてきなひだ", "はながさいてることりたちがさえずってる", "こんなひにはおまえみたいなやつは...", "じごくでもえてしまえばいい", "はは...", "いつもおもってたんだ", "なんでみんなさいしょにひっさつわざをつかわないんだろうって", "え？", "まさかおとなしくくらうとでもおもったか？", "じくうにだいきぼなゆがみがはっせいしているらしい", "じかんのながれがめちゃくちゃにとんで...", "とまって...", "またうごいて", "そしてとつぜんすべてがおわりをむかえるんだ", "へへへ...", "それっておまえのしわざなんだろ？", "おまえにはわからないんだろうな", "あるひとつぜんなんのまえぶれもなく...", "なにもかもがりせっとされる...", "それをしりながらいきていくきもちなんて", "おれはとっくにあきらめた", "もうちじょうにもどりたいとおもうこともなくなった", "だってもしもどれたって...", "すぐにまたここへもどされるんだろ？", "きおくをけされてさ", "そんなだから...", "しょうじきなにをやってもやるきがでない", "...まそれもなまけるためのこうじつなのかもしれないけどな", "じぶんでもよくわからないよ", "ただひとつわかるのは...", "このあとなにがおきるかしっているいじょう...", "もうなにもしないでみているわけにはいかないってことさー", "まそれはさておき...", "おまえほんとにぶきをふりまわすのすきだな", "...", "なぁ", "おまえさっきはこたえてくれなかったけど...", "おれにはわかるよ", "おまえのなかにはせいぎのこころのかけらがある", "ただしいことをのぞんだやつのきおくがあるはずだ", "ひょっとしておれたち...", "べつのじかんじくでは...", "ともだちだったんじゃないのか？", "なぁこたえてくれよ", "おれのことおぼえてるのか？", "おれのいってることのいみがわかるなら...", "こんなのもうやめようぜ？", "ぶきをおいてくれよそしたら...", "おれのしごともらくになる", "まいちおういってみただけだ", "そっちがやめるきないならしかたない", "じつはさおれこっそりおもってたんだ", "おまえとともだちになれないかなって", "じくうがゆがむのはだれかがふまんをかんじてるからかもしれない...ってな", "だからそのふまんをかいしょうしてやれば", "ゆがまなくなるかもっておもったんだ", "どうすればふまんがかいしょうされるのかはわからないけど...", "うまいめしとかくだらないぎゃぐとか", "ともだちとかがあればいいのかなってさ", 
    "...わらえるだろ？", "そうおまえはなにをやってもぜったいにまんぞくなんてしないのにな", "なんどもなんどもじかんじくをくいあらして...", "そしてさいごは...", "......", "...なぁ", "これだけはちゅうこくしておく", "おまえもいつかは...", "「やめる」せんたくをしなきゃいけなくなるんだ", "そして...きょうがそのときだ", "だって...", "たたかいっぱなしでおれはもうへとへとだよ", "これいじょうやるつもりなら...", "すぺしゃるこうげきをつかわないといけなくなる", "そうおれのすぺしゃるこうげき...どこかできいたことあるか？", "かくごしなよ...つぎのこうげきのあとではつどうするから", "それがいやならいまのうちにしんだほうがいい", "はぁしょうがないな...", "じゃいくぞ？", "このこうげきをのりきったらおれのすぺしゃるこうげきがさくれつするからな", "はぁ...はぁ...", "しかたないな...", "それじゃほんとにすぺしゃるこうげきをおみまいするからな", "かくごはいいか？", "おどろくなよ...", "どうだ？", "「おどろくな」っていっただろ？", "そうすぺしゃるこうげきなんてないんだ", "いくらまってもなにもおこらないよ", "へへへ...おどろくわけないよな？", "そうおまえをたおすなんておれにはむりなんだ", "おまえのたーんになったら...", "いつかはころされる", "それで...", "おもいついたんだよ...", "おまえのたーんにならなきゃいいって", "だからおまえがあきらめるまでおれのたーんをつづけることにした", "ここでふたりえいきゅうにたたかいつづけることになってもな", "わかったか？", "ここにいてもたいくつするだけだ", "っていうかもうたいくつしてきたんじゃないか？", "たいくつしたらおまえは「やめる」だろ？", "しってるよ...おまえみたいなやつのことは...", "「けついが かたい」 ...っていうんだろ？", "なにがあってもぜったいにあきらめようとしないんだ...", "がんばったところでいいことなんてひとつもないのにさ", "どれだけはっきりいってやっても...", "やめようとしない", "いいかわるいかなんてかんけいないんだよな？", "「できる」ってだけでやろうとするんだ", "そう...「できる」ってだけで...", "...やらずにはいられないんだ", "だけどこんどこそほんとにおわりだぜ", "これいじょうはなにもない", "だからおれからいえることはひとつだけ", "おまえはそのつよい「けつい」で...", "すっぱりあきらめることだ", "そして...ふああぁぁ...なにかべつのことでもするんだな", "おーっとそうはとんやが...", "...", "...", "...", "はは...", "どうやらここまでみたいだな", "...", "いいかい...？", "おれはとめたからな？", "んじゃ...", "ぐりるびーずにでもいくかな", "ぱぴるすおまえもはらへってるか？"
];


// ★★★ 5. 新規追加: セリフに対応するサンズの画像ファイル名の定義 (変更なし) ★★★
const sansImageMap = {
    // ... (画像マップは変更なし) ...
    0: "sans_close_stop.gif", 1: "sans_close_stop.gif", 2: "sans_close_stop.gif", 3: "sans_black_stop.gif", 4: "sans_half_stop.gif", 
    5: "sans_half_hand_stop.gif", 6: "sans_half_hand_stop.gif", 7: "sans_wink_hand.gif", 8: "sans_wink_hand.gif", 9: "sans_open.gif", 
    10: "sans_open.gif", 11: "sans_open.gif", 12: "sans_open.gif", 13: "sans_close.gif", 14: "sans_close.gif", 
    15: "sans_black.gif", 16: "sans_half.gif", 17: "sans_close.gif", 18: "sans_semiopen.gif", 19: "sans_semiopen.gif", 
    20: "sans_semiopen_hand.gif", 21: "sans_close_hand.gif", 22: "sans_close_hand.gif", 23: "sans_black_hand.gif", 24: "sans_black_hand.gif", 
    25: "sans_half_hand.gif", 26: "sans_close_hand.gif", 27: "sans_half_hand.gif", 28: "sans_wink_hand.gif", 29: "sans_close_hand.gif", 
    30: "sans_close_hand.gif", 31: "sans_semiopen_hand.gif", 32: "sans_semiopen_mid.gif", 33: "sans_half_mid.gif", 34: "sans_open_mid.gif", 
    35: "sans_close_mid.gif", 36: "sans_close_mid.gif", 37: "sans_close_mid.gif", 38: "sans_open_mid.gif", 39: "sans_close_mid.gif", 
    40: "sans_half_mid.gif", 41: "sans_close_mid.gif", 42: "sans_close_mid.gif", 43: "sans_wink_mid.gif", 44: "sans_open_mid.gif", 
    45: "sans_close_mid.gif", 46: "sans_semiopen_mid.gif", 47: "sans_wink_mid.gif", 48: "sans_close_mid.gif", 49: "sans_wink_hand_mid.gif", 
    50: "sans_black_hand_mid.gif", 51: "sans_close_mid.gif", 52: "sans_close_mid.gif", 53: "sans_half_mid.gif", 54: "sans_half_mid.gif", 
    55: "sans_half_mid.gif", 56: "sans_wink_mid.gif", 57: "sans_wink_hand_mid.gif", 58: "sans_wink_hand_mid.gif", 59: "sans_close_mid.gif", 
    60: "sans_black_mid.gif", 61: "sans_black_mid.gif", 62: "sans_close_mid.gif", 63: "sans_close_mid.gif", 64: "sans_close_hand_mid.gif", 
    65: "sans_wink_hand_mid.gif", 66: "sans_wink_hand_mid.gif", 67: "sans_wink_hand_mid.gif", 68: "sans_wink_mid.gif", 69: "sans_close_sma.gif", 
    70: "sans_half_sma.gif", 71: "sans_close_sma.gif", 72: "sans_wink_sma.gif", 73: "sans_wink_mid.gif", 74: "sans_half_mid.gif", 
    75: "sans_wink_mid.gif", 76: "sans_close.gif", 77: "sans_wink.gif", 78: "sans_black.gif", 79: "sans_semiopen_lad.gif", 
    80: "sans_semiopen_lad.gif", 81: "sans_semiopen_hand_lad.gif", 82: "sans_wink_hand_lad.gif", 83: "sans_close_hand_lad.gif", 84: "sans_half_lad.gif", 
    85: "sans_half_lad.gif", 86: "sans_wink_lad.gif", 87: "sans_half_lad.gif", 88: "sans_close_lad.gif", 89: "sans_half_lad.gif", 
    90: "sans_close_lad.gif", 91: "sans_semiopen_lad.gif", 92: "sans_half_lad.gif", 93: "sans_close_lad.gif", 94: "sans_close_lad.gif", 
    95: "sans_wink_lad.gif", 96: "sans_black_lad.gif", 97: "sans_half_lad.gif", 98: "sans_semiopen_lad.gif", 99: "sans_half_lad.gif", 
    100: "sans_black_lad.gif", 101: "sans_black_lad.gif", 102: "sans_half_lad.gif", 103: "sans_close_lad.gif", 104: "sans_wink_lad.gif", 
    105: "sans_half_lad.gif", 106: "sans_close_lad.gif", 107: "sans_semiopen_lad.gif", 108: "sans_wink_lad.gif", 109: "sans_half_lad.gif", 
    110: "sans_semiopen_lad.gif", 111: "sans_semiopen_lad.gif", 112: "sans_close_lad.gif", 113: "sans_half_lad.gif", 114: "sans_wink_lad.gif", 
    115: "sans_half_lad.gif", 116: "sans_wink_lad.gif", 117: "sans_wink_hand_stop.gif", 118: "sans_close_sit_blo.gif", 119: "sans_semiopen_sit_blo.gif", 
    120: "sans_semiopenano_sit_blo.gif", 121: "sans_semiopen_sit_blo.gif", 122: "sans_semiopen_sit_blo.gif", 123: "sans_semiopenano_sit_blo.gif", 124: "sans_close_sit_blo.gif", 
    125: "sans_close_sit_blo.gif", 126: "sans_close_blo_stop.gif", 127: "sans_wink_hand_blo_stop.gif", 128: "sans_wink_hand_blo_stop.gif" 
};


// =========================================================
// 1.5. セリフに対応するイベント配列 (変更なし)
// =========================================================
const dialogueEvents = [
    // index 0: "今日は ステキな日だ" 
    { sound: null, action: `startBGM:${BIRDS_BGM_PATH}` }, 
    // index 1: "花が 咲いてる 小鳥たちが さえずってる"
    { sound: null, action: null }, 
    // index 2: "こんな日には お前みたいな ヤツは..."
    { sound: null, action: null }, 
    // index 3: "地獄で 燃えて しまえば いい" 
    { sound: null, action: 'stopBGM' }, 
    // index 4: "ハハ..." 
    { sound: null, action: `startBGM:${MEGALOVANIA_PATH}` }, 
    
    // index 5 から index 31 
    ...Array(27).fill({ sound: null, action: null }),

    // index 32: "ま それは さておき..." 
    { sound: null, action: 'stopBGM' },
    // index 33: "お前 ホントに 武器を 振り回すの 好きだな"
    { sound: null, action: null },
    // index 34: "..." 
    { sound: null, action: `startBGM:${CHOKEDUP_BGM_PATH}` },

    // index 35 から index 48 
    ...Array(14).fill({ sound: null, action: null }),
   
    // index 49: "ま 一応 言ってみただけだ" 
    { sound: null, action: 'stopBGM' },
    // index 50: "そっちが やめる気 ないなら しかたない"
    { sound: null, action: null },
    // index 51: "実はさ オレ こっそり思ってたんだ" 
    { sound: null, action: `startBGM:${MEGALOVANIA_PATH}:64` }, // 64秒から再生

    // index 52 から index 78 (ユーザー指定)
    ...Array(27).fill({ sound: null, action: null }),

    // index 79: "ハァ...ハァ..." (ユーザー指定)
    { sound: null, action: 'fadeOutBGM:3000' }, 
    
    // index 80 から index 116 (ユーザー指定)
    ...Array(37).fill({ sound: null, action: null }),

    // index 117: "おーっと そうは とんやが..." 
    { sound: null, action: 'clearEvent:slashStrike' }, 
    
    // index 118-126 (ユーザー指定)
    ...Array(9).fill({ sound: null, action: null }),

    // index 127: "グリルビーズにでも 行くかな" 
    { sound: null, action: 'clearEvent:sansFadeOut' },
    
    // index 128: "パピルス お前も 腹 減ってるか？" 
    { sound: null, action: 'clearEvent:finalClear' },// ★finalClearイベントを呼び出し
];

// =========================================================
// 2. DOM要素の取得 / グローバル変数の定義
// =========================================================

const problemTextElement = document.getElementById('problem-text');
const battleBoxElement = document.getElementById('battle-box');
const sansImageElement = document.getElementById('sans-image');
const hpGaugeElement = document.getElementById('hp-gauge');
const hpValueElement = document.getElementById('hp-value');
const mistakesValueElement = document.getElementById('mistakes-value');
const sansAreaElement = document.getElementById('sans-area');
const infoAreaElement = document.getElementById('info-area');
const bodyElement = document.body;

// ゲーム状態変数
let gameInitialized = false;
let currentDialogueIndex = 0;
let currentText = "";
let currentReading = "";
let currentMaxHP = MAX_HP_INITIAL;
let currentHP = MAX_HP_INITIAL;
let mistakeCount = 0;
let gameStartTime = 0;
let scoreIntervalId = null;
let bgmAudio = null;
let gameOverBGM = null; // ゲームオーバーBGM用オブジェクト
let isGameOver = false;

// ローマ字/かな変換の変数
let currentKanaIndex = 0;
let currentKana = '';
let currentValidRomaji = [];
let typedRomaji = '';
let totalCorrectKeystrokes = 0;


// =========================================================
// 3. ローマ字・かな変換ルール (ユーザーファイルのものを維持、ぴょは修正済み)
// =========================================================
const ROMAJI_RULES = {
    'ぁ': ['xa', 'la'], 'ぃ': ['xi', 'li'], 'ぅ': ['xu', 'lu'], 'ぇ': ['xe', 'le'], 'ぉ': ['xo', 'lo'], 
    'っ': ['xtu', 'ltu', 'xtsu', 'ltsu'],
    'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'], 
    'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
    'さ': ['sa'], 'し': ['shi', 'si'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'], 
    'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
    'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'], 
    'は': ['ha'], 'ひ': ['hi'], 'ふ': ['hu', 'fu'], 'へ': ['he'], 'ほ': ['ho'], 
    'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'], 
    'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'], 'ら': ['ra'], 'り': ['ri'],
    'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'], 'わ': ['wa'], 'を': ['wo'], 
    
    'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'], 
    'ざ': ['za'], 'じ': ['zi', 'ji'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'], 
    'だ': ['da'], 'ぢ': ['di'], 'づ': ['du'], 'で': ['de'], 'ど': ['do'], 
    'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'], 
    'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'], 

    'きゃ': ['kya'], 'きゅ': ['kyu'], 'きょ': ['kyo'], 'しゃ': ['sha', 'sya'], 'しゅ': ['shu', 'syu'], 'しょ': ['sho', 'syo'], 
    'ちゃ': ['cha', 'tya'], 'ちゅ': ['chu', 'tyu'], 'ちょ': ['cho', 'tyo'], 'にゃ': ['nya'], 'にゅ': ['nyu'], 'にょ': ['nyo'], 
    'ひゃ': ['hya'], 'ひゅ': ['hyu'], 'ひょ': ['hyo'], 'みゃ': ['mya'], 'みゅ': ['myu'], 'みょ': ['myo'], // 'mo'は削除
    'りゃ': ['rya'], 'りゅ': ['ryu'], 'りょ': ['ryo'], 'ぎゃ': ['gya'], 'ぎゅ': ['gyu'], 'ぎょ': ['gyo'], 
    'じゃ': ['ja', 'jya'], 'じゅ': ['ju', 'jyu'], 'じょ': ['jo', 'jyo'], 'びゃ': ['bya'], 'びゅ': ['byu'], 'びょ': ['byo'], 
    'ふぁ': ['fa'], 'ふぃ': ['fi'], 'ふぇ': ['fe'], 'ふぉ': ['fo'], 


    // ユーザー修正を反映
    'ぴゃ': ['pya'], 'ぴゅ': ['pyu'], 'ぴょ': ['pyo'],     
    '「': ['['], '」': [']'], 'ー': ['-'], '、': [','], '。': ['.'], '！': ['!'], '？': ['?'], '.': ['.'], '…': ['...']
};


// =========================================================
// 3.5 SEの準備
// =========================================================
const typeAudio = new Audio(TYPE_SOUND_PATH);
const damageAudio = new Audio(DAMAGE_SOUND_PATH);
const shatterAudio = new Audio(SHATTER_SOUND_PATH);
const savepointAudio = new Audio(SAVEPOINT_SOUND_PATH);
const slashAudio = new Audio(SLASH_SOUND_PATH);
const strikeAudio = new Audio(STRIKE_SOUND_PATH);
const killAudio = new Audio(KILL_SOUND_PATH); // ★使用するSE
const healAudio = new Audio(HEAL_SOUND_PATH); 
const skipAudio = new Audio(SKIP_SOUND_PATH); // ★修正点1-2: スキップ音声オブジェクトの作成★


// =========================================================
// 4. BGM/SE 制御関数 
// =========================================================

function playAudio(audioObj, volume = 1.0) {
    audioObj.currentTime = 0;
    audioObj.volume = volume;
    audioObj.play().catch(e => console.log("Audio play prevented:", e));
}

function startBGM(path, startTimeSeconds = 0) {
    stopBGM(); 
    bgmAudio = new Audio(path);
    bgmAudio.loop = true;
    bgmAudio.volume = BGM_VOLUME;
    
    if (startTimeSeconds > 0) {
        bgmAudio.currentTime = startTimeSeconds;
    }
    
    bgmAudio.play().catch(e => console.log("BGM play prevented:", e)); 
}

function stopBGM() {
    if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
        bgmAudio = null;
    }
}

function fadeOutBGM(durationMs) {
    if (!bgmAudio) return;

    const steps = 100;
    const intervalMs = durationMs / steps;
    const stepVolume = bgmAudio.volume / steps;
    
    let currentVolume = bgmAudio.volume;
    
    const fadeInterval = setInterval(() => {
        currentVolume -= stepVolume;
        if (currentVolume <= 0) {
            currentVolume = 0;
            stopBGM();
            clearInterval(fadeInterval);
        } else {
            bgmAudio.volume = currentVolume;
        }
    }, intervalMs);
}


// =========================================================
// 5. イベント実行関数 (変更なし)
// =========================================================

// =========================================================
// 5. 経過時間計測の関数 (新規追加)
// =========================================================

function updateTimeDisplay() {
    elapsedTime = Date.now() - startTime;
    
    // ミリ秒を計算 (下2桁のみ表示)
    const ms = String(Math.floor(elapsedTime % 1000)).padStart(3, '0').slice(0, 2);
    
    // 秒を計算
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    
    // 分を計算
    const minutes = Math.floor(totalSeconds / 60);

    // 形式 (分):(秒).00 で表示
    timeValueElement.textContent = `${minutes}:${seconds}.${ms}`;
}

function startTimer() {
    if (timeInterval) {
        clearInterval(timeInterval); // 既存のタイマーをクリア
    }
    startTime = Date.now() - elapsedTime; // 停止していた時間から再開
    // 10ミリ秒ごとに時間を更新
    timeInterval = setInterval(updateTimeDisplay, 10); 
}

function stopTimer() {
    if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = null;
    }
}




function executeDialogueEvent(event) {
    if (!event || !event.action) return;

    if (event.action.startsWith('clearEvent:')) return; 

    const actionParts = event.action.split(':');
    const actionName = actionParts[0];
    
    switch (actionName) {
        case 'startBGM':
            const path = actionParts[1];
            const startTime = actionParts.length > 2 ? parseInt(actionParts[2]) : 0;
            startBGM(path, startTime);
            break;
        case 'stopBGM':
            stopBGM();
            break;
        case 'fadeOutBGM':
            fadeOutBGM(parseInt(actionParts[1]));
            break;
        default:
            console.log(`未定義/未実装のアクション: ${event.action}`);
    }
}


// =========================================================
// 6. 問題クリア後の特殊イベント
// =========================================================

function resumeDialogueFlow(delayMs = 300) {
    setTimeout(() => {
        loadNextDialogue();
    }, delayMs);
}

// slashStrikeEvent (変更なし)
function slashStrikeEvent() {
    // 1. 問題文入力完了直後、problem-textとbattle-boxの文字表示を消す
    problemTextElement.innerHTML = '';
    battleBoxElement.innerHTML = '';
    
    // 2. 入力完了から1秒後 (DELAY_BEFORE_SLASH) にse_slash.mp3とsans_slash.gifを再生
    setTimeout(() => {
        // --- SLASH アニメーション開始 (1.0秒時点) ---
        playAudio(slashAudio);
        sansImageElement.src = SANS_SLASH_IMAGE_PATH; 
        
        // 3. さらに1.5秒後 (SLASH_TO_STRIKE_DELAY、合計2.5秒時点) にse_strike.mp3とsans_strike.gifを再生
        setTimeout(() => {
            // --- STRIKE アニメーション開始 (2.5秒時点) ---
            playAudio(strikeAudio);
            sansImageElement.src = SANS_STRIKE_IMAGE_PATH; 
            
            // 4. さらに5.5秒後 (STRIKE_TO_NEXT_DELAY、合計8.0秒時点) に、次の問題へ移行
            setTimeout(() => {
                resumeDialogueFlow(0); // 次のセリフをロード
            }, STRIKE_TO_NEXT_DELAY); // 5500ms
            
        }, SLASH_TO_STRIKE_DELAY); // 1500ms
        
    }, DELAY_BEFORE_SLASH); // 1000ms (1秒) の遅延
}

function sansFadeOutEvent() {
    problemTextElement.innerHTML = '';
    battleBoxElement.innerHTML = '';
    
    sansImageElement.style.transition = 'opacity 3s ease-out';
    sansImageElement.style.opacity = '0';
    
    setTimeout(() => {
        sansImageElement.style.transition = ''; 
        resumeDialogueFlow(0);
    }, 3000);
}

// ★★★ 修正点1: finalClearEventのロジック変更 ★★★
function finalClearEvent() {
    // ① 問題文をすべて入力完了直後、problem-areaとbattle-boxからテキストを非表示にする
    problemTextElement.innerHTML = '';
    battleBoxElement.innerHTML = '';
    
    // → 問題文の入力完了から1秒後にse_kill.mp3を鳴らし、最大HPを99にアップさせる
    setTimeout(() => {
        playAudio(killAudio);
        
        // 最大HPを99にアップさせます(現在HPは変動しない)
        currentMaxHP = MAX_HP_AFTER_CLEAR; 
        updateHPDisplay(); 

        // → se_kill.mp3を鳴らしてから1.5秒後にクリア画面に移行
        setTimeout(() => {
            triggerGameClear(); 
        }, 1500); // 1.5秒
        
    }, 1000); // 1.0秒
}


// =========================================================
// 7. 問題の表示と状態更新の関数
// =========================================================


function loadNextReading() {
    // ... 既存の処理 ...

    if (!gameStarted) {
        gameStarted = true;
        // ★修正点1-3: ゲーム開始時にタイマーをスタート★
        startTimer(); 
    }
    
    // ... 既存の処理 ...
}



function getRomajiSequence(text, index) {
    const char = text.charAt(index);
    
    // ----------------------------------------------------------------------
    // 1. 拗音（きゃ、しゅ、など）の判定
    // ----------------------------------------------------------------------
    if (index + 1 < text.length) {
        const nextChar = text.charAt(index + 1);
        const twoChars = char + nextChar;
        if (ROMAJI_RULES[twoChars] !== undefined) {
            return { romaji: ROMAJI_RULES[twoChars], length: 2 }; 
        }
    }

    // ----------------------------------------------------------------------
    // 2. 「っ」の判定（標準の子音重ね打ちと拡張入力を両立させる）
    // ----------------------------------------------------------------------
   if (char === 'っ') {
        // 拡張入力の判定: xtu, ltu, xtsu, ltsu
        const extendedRomaji = ROMAJI_RULES['っ'] || [];
        
        if (index + 1 < text.length) {
            // 標準入力（子音重ね打ち）の判定
            const nextSequence = getRomajiSequence(text, index + 1);
            
            if (nextSequence.romaji[0] !== '-(KEY_IGNORE)') {
                // 次のカナブロックの先頭子音を取得
                const repeatedConsonants = nextSequence.romaji
                    .map(r => r.charAt(0))
                    .filter((v, i, a) => a.indexOf(v) === i); // 重複を排除

                // ★修正点1-2: 標準入力（子音重ね打ち）をリストの先頭に配置し、表示を優先させる
                return { 
                    romaji: [...repeatedConsonants, ...extendedRomaji], 
                    length: 1 
                };
            }
        }
        // 文末の「っ」または無視文字が続く場合は、拡張入力のみ（または無視）
        return { romaji: extendedRomaji.length > 0 ? extendedRomaji : ['-(KEY_IGNORE)'], length: 1 };
    }

    // ----------------------------------------------------------------------
    // 3. 「ん」の判定（文脈に応じてルールを切り替える）
    // ----------------------------------------------------------------------
    if (char === 'ん') {
        let isFollowedByVowelOrEnd = false;
        
        if (index + 1 >= text.length) {
            // (1) 文末の場合 (わいん)
            isFollowedByVowelOrEnd = true;
        } else {
            // (2) 次のカナブロックのローマ字の先頭が母音かどうか
            const nextSequence = getRomajiSequence(text, index + 1);
            if (nextSequence.romaji[0] !== '-(KEY_IGNORE)') {
                const firstChar = nextSequence.romaji[0].charAt(0).toLowerCase();
                // 次のカナの先頭が母音 (a, i, u, e, o) または 'y' (や行) の場合
                if (['a', 'i', 'u', 'e', 'o', 'y'].includes(firstChar)) { 
                    isFollowedByVowelOrEnd = true; 
                }
            }
        }

        // 【すべての場合】: NNまたはXNを強制し、単独の'n'を許容しない
        // これにより、「ん」は必ず2文字以上の入力が求められるため、
        // typedRomajiがリセットされてしまう問題を防ぎ、
        // 「KONNNA」や「TANNDA」を正しく判定できます。
        return { romaji: ['nn', 'xn'], length: 1 };
    }
    
    // ----------------------------------------------------------------------
    // 4. その他の1文字カナ、句読点などの判定
    // ----------------------------------------------------------------------
    if (ROMAJI_RULES[char] !== undefined) {
        return { romaji: ROMAJI_RULES[char], length: 1 };
    }
    
    // 5. ROMAJI_RULESに定義されていない無視すべき文字
    return { romaji: ['-(KEY_IGNORE)'], length: 1 };
}

function updateCurrentRomaji() {
    const maxIterations = currentReading.length;
    let iterationCount = 0;
    
    while (currentKanaIndex < currentReading.length) {
        if (iterationCount > maxIterations) {
            console.error("updateCurrentRomaji: ループエラー");
            break; 
        }
        
        const { romaji, length } = getRomajiSequence(currentReading, currentKanaIndex);
        
        if (romaji.length === 1 && romaji[0] === '-(KEY_IGNORE)') {
            currentKanaIndex += length;
            iterationCount++;
            continue;
        }

        currentValidRomaji = romaji;
        currentKana = currentReading.substring(currentKanaIndex, currentKanaIndex + length);
        typedRomaji = '';
        return;
    }

    currentValidRomaji = [];
    currentKana = '';
    typedRomaji = '';
}

function loadNextDialogue() {
    if (currentDialogueIndex >= sansDialogues.length) {
        triggerGameClear();
        return;
    }

    // ★★★ 5. 新規追加: セリフに対応する画像切り替え ★★★
    const newImage = sansImageMap[currentDialogueIndex];
    if (newImage) {
        sansImageElement.src = newImage;
    }
    
    const event = dialogueEvents[currentDialogueIndex];
    if (event) {
        executeDialogueEvent(event);
    }
    
    currentText = sansDialogues[currentDialogueIndex];
    currentReading = sansReadings[currentDialogueIndex];
    currentKanaIndex = 0; 
    typedRomaji = "";
    
    updateCurrentRomaji(); 
    
    renderText();
    battleBoxElement.focus(); 
}

function renderText() {
    
    problemTextElement.style.color = 'white'; 
    problemTextElement.style.opacity = '1';   
    problemTextElement.style.fontSize = '1.8em'; 
    problemTextElement.style.textAlign = 'center';
    problemTextElement.innerHTML = currentText; 
    
    let romajiProgressHTML = '';
    let bestMatchRomaji = currentValidRomaji.find(r => r.startsWith(typedRomaji)) || currentValidRomaji[0] || '';
    let totalRomajiDisplay = "";

    let kanaPointer = 0;
    while(kanaPointer < currentKanaIndex) {
        const { romaji, length } = getRomajiSequence(currentReading, kanaPointer);
        if (romaji[0] !== '-(KEY_IGNORE)') {
            totalRomajiDisplay += romaji[0];
        }
        kanaPointer += length;
    }

    // A. 完了した部分 (グレー) 
    romajiProgressHTML += `<span style="color: #666; white-space: nowrap;">${totalRomajiDisplay.toUpperCase()}</span>`;

    // B. 現在打鍵中の文字のローマ字強調表示
    if (currentValidRomaji.length > 0) {
        const remainingRomaji = bestMatchRomaji.substring(typedRomaji.length);
        const typedRomajiUpper = typedRomaji.toUpperCase();

        // 打鍵済み (黄色)
        romajiProgressHTML += `<span style="color: #666; white-space: nowrap;">${typedRomajiUpper}</span>`;
        
        // 次に打鍵すべき一文字 (白色・下線)
        if (remainingRomaji.length > 0) {
            romajiProgressHTML += `<span style="border-bottom: 2px solid white; color: white; white-space: nowrap;">${remainingRomaji.charAt(0).toUpperCase()}</span>`;
            romajiProgressHTML += `<span style="color: white; white-space: nowrap;">${remainingRomaji.substring(1).toUpperCase()}</span>`;
        }
        
        // C. 未打鍵の部分 (グレー)
        let remainingReading = currentReading.substring(currentKanaIndex + currentKana.length);
        let remainingRomajiDisplay = "";
        kanaPointer = 0;
        while(kanaPointer < remainingReading.length) {
            const { romaji, length } = getRomajiSequence(remainingReading, kanaPointer);
            if (romaji[0] !== '-(KEY_IGNORE)') {
                 remainingRomajiDisplay += romaji[0];
            }
            kanaPointer += length;
        }
        
        romajiProgressHTML += `<span style="color: #fff; white-space: nowrap;">${remainingRomajiDisplay.toUpperCase()}</span>`;
    }
    
    // 2. 読み仮名 (ひらがな) の進捗を生成
    let readingProgressHTML = `
        <span style="white-space: nowrap;font-size: 80%;">
            <span style="color: yellow;">${currentReading.substring(0, currentKanaIndex)}</span>
            <span style="border-bottom: 2px solid white; color: white;">${currentKana}</span>
            <span>${currentReading.substring(currentKanaIndex + currentKana.length)}</span>
        </span>
    `;

    // 3. #battle-box の内容を、読み仮名とローマ字で構成
    battleBoxElement.innerHTML = `
        <div style="padding-top: 15px; padding-bottom: 15px; text-align: center;">
            <div style="font-size: 1.8em; color: #707070; margin-bottom: 0.5em;">
                ${readingProgressHTML}
            </div>
            <div style="font-size: 1.2em; color: #707070; letter-spacing: 0.05em; font-weight: bold;">
                ${romajiProgressHTML}
            </div>
        </div>
    `;
}

// =========================================================
// 8. キーボード入力のイベントリスナー（メインロジック）
// =========================================================

battleBoxElement.addEventListener('keydown', (e) => {
    if (isGameOver || !gameInitialized) {
        return;
    }


// 🌟 修正箇所: キーリピート（押しっぱなしによる連続入力）を無視 🌟
    if (e.repeat) {
        return; 
    }

    
    // ★★★ 修正箇所: Fキーが押されたら誤タイプせずに処理を終了する ★★★
    if (e.code.startsWith('F') && e.code.length > 1 && parseInt(e.code.substring(1)) >= 1 && parseInt(e.code.substring(1)) <= 12) {
        return; 
    }
    
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt') {
        return; 
    }
    
    if (e.key === 'Backspace' || e.key === ' ') {
        e.preventDefault();
        return;
    }
    
    const originalKey = e.key;             
    
    // HP全回復機能（「1」キー）
    if (originalKey === '1') {
        e.preventDefault();
        
        currentHP = currentMaxHP; 
        playAudio(healAudio); 
        updateHPDisplay();
        updateScoreDisplay(); 
        return; 
    }

    // ★修正点1-3: スキップ機能（「2」キー）の音声変更★
    if (originalKey === '2') {
        e.preventDefault();
        
        if (isGameOver || !gameInitialized) return;

        playAudio(skipAudio); 
        
        currentDialogueIndex++; 
        
        if (currentDialogueIndex < sansDialogues.length) {
            loadNextDialogue();
        } else {
            // スキップで最終セリフを超えた場合はクリア処理
            triggerGameClear(); 
        }
        return; 
    }

    // 1. Enterキーはミスタイプ判定
    if (originalKey === 'Enter') {
        e.preventDefault();
        
        playAudio(damageAudio);
        mistakeCount++;
        currentHP--;
        updateHPDisplay();

        if (currentHP <= 0) {
            triggerGameOver(); 
        }
        updateScoreDisplay(); 

    } 
    // 2. ローマ字入力判定ロジック
    else if (originalKey.match(/[a-zA-Z0-9\-\!\?\.\,\[\]]/) && currentValidRomaji.length > 0) { 
        
        e.preventDefault(); 
        
        const nextTypedRomaji = typedRomaji + originalKey.toLowerCase(); 
        
        const isMatch = currentValidRomaji.some(r => r.startsWith(nextTypedRomaji));
        
        if (isMatch) {
            // 正解
            playAudio(typeAudio);
            typedRomaji = nextTypedRomaji; 
            
            totalCorrectKeystrokes++; 
            
            const isCompleted = currentValidRomaji.some(r => r === typedRomaji);

            if (isCompleted) {
                // 通常の問題クリア処理: 次のカナブロックへ
                currentKanaIndex += currentKana.length; 
                updateCurrentRomaji(); 
                
                // ★修正点3: 問題文全体の完了判定と特殊イベントチェックをここに移動★
                if (currentValidRomaji.length === 0 && currentKanaIndex >= currentReading.length) {
                    
                    const event = dialogueEvents[currentDialogueIndex];
                    if (event && event.action && event.action.startsWith('clearEvent:')) {
                        const eventType = event.action.split(':')[1];
                        currentDialogueIndex++; // イベント実行前にインデックスを進める
                        
                        switch (eventType) {
                            case 'slashStrike': slashStrikeEvent(); return; // 問題文の完了を待ってから実行
                            case 'sansFadeOut': sansFadeOutEvent(); return;
                            case 'finalClear': finalClearEvent(); return; // ★最終クリアイベントを呼び出し
                        }
                    }
                    
                    // 通常の問題クリア処理 (特殊イベントがない場合)
                    currentDialogueIndex++;
                    setTimeout(loadNextDialogue, 300); 
                } else {
                    // 問題文の途中のカナブロックが完了した場合
                    renderText(); 
                }
                
            } else {
                 renderText();
            }
            
            updateScoreDisplay(); 

        } else {
            // 不正解
            playAudio(damageAudio);
            mistakeCount++;
            currentHP--;
            
            updateHPDisplay();

            if (currentHP <= 0) {
                triggerGameOver(); 
            }
            
            updateScoreDisplay(); 
        }
    } else {
        // 処理対象外のキー
        e.preventDefault();
    }
});



// =========================================================
// 9. 補助関数 (HP表示、スコア更新、ゲームオーバー/クリア)
// =========================================================


function updateHPDisplay() {
    const hpPercent = (currentHP / currentMaxHP) * 100;
    hpGaugeElement.style.width = `${Math.max(0, hpPercent)}%`;

    // ★★★ 修正箇所: HP値の動的画像変換ロジック ★★★
    const displayCurrentHP = Math.max(0, currentHP);
    const displayMaxHP = currentMaxHP;

    // 1. 現在HPを2桁表示にパディングする
    // 例: 5 -> "05", 92 -> "92"
    const paddedCurrentHP = String(displayCurrentHP).padStart(2, '0');
    
    // 2. HP表示文字列を作成
    const hpString = `${paddedCurrentHP} / ${displayMaxHP}`;
    let hpImageHTML = '';

    // 3. 文字列を1文字ずつ処理し、対応する画像に変換
    for (const char of hpString) {
        const imageFile = HP_IMAGE_MAP[char];
        if (imageFile) {
            hpImageHTML += `<img src="${imageFile}" class="hp-img-dynamic" alt="${char}">`;
        }
    }

    hpValueElement.innerHTML = hpImageHTML;
    // ----------------------------------------------------
    
    if (currentHP <= 0) {
        triggerGameOver();
    }
}


function updateScoreDisplay() {
    if (gameStartTime === 0) {
        document.getElementById('cpm-value').textContent = 0;
        document.getElementById('wpm-value').textContent = 0;
        document.getElementById('accuracy-value').textContent = '100.00%';
        mistakesValueElement.textContent = mistakeCount;
        return;
    }

    const currentTime = Date.now();
    const elapsedTimeSeconds = (currentTime - gameStartTime) / 1000;
    
    if (elapsedTimeSeconds < 1) { return; }

    const cpm = Math.round((totalCorrectKeystrokes / elapsedTimeSeconds) * 60);
    const wpm = Math.round(cpm / 5);
    const totalKeystrokes = totalCorrectKeystrokes + mistakeCount;
    const accuracy = (totalKeystrokes === 0) 
        ? 100.00 
        : (totalCorrectKeystrokes / totalKeystrokes) * 100;
        
    const formattedAccuracy = accuracy.toFixed(2) + '%';
    
    document.getElementById('cpm-value').textContent = cpm;
    document.getElementById('wpm-value').textContent = wpm;
    document.getElementById('accuracy-value').textContent = formattedAccuracy;
    mistakesValueElement.textContent = mistakeCount;
}

// ★★★ 修正箇所: setupGameClearListener を setupContinueListener と統合したため、ここでは triggerGameClear の実装のみ。 ★★★
function triggerGameClear() {
    isGameOver = true;
    stopBGM(); 
    stopTimer();
    if (scoreIntervalId) {
        clearInterval(scoreIntervalId);
        scoreIntervalId = null;
    }
    
    sansAreaElement.style.opacity = '0';  
    battleBoxElement.style.opacity = '0'; 
    
    // ②クリア画面の「CONGRATULATIONS！」のテキストをすべて消去
    const clearMessage = ""; // <- 空文字列に変更
    problemTextElement.innerHTML = clearMessage;
    
    const overlay = document.createElement('div');
    overlay.id = 'game-over-screen';
    overlay.className = 'game-overlay'; 
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '20'; 
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    // HTML内のクリアメッセージも空に
    overlay.innerHTML = `
        <p style="color: yellow; font-size: 3em; margin-bottom: 30px;">${clearMessage}</p>
        <p id="continue-text" style="color: #fff; font-size: 20px; text-align: center; margin-top: 10px;">RESTART [SPACE]</p>
    `;
    document.body.appendChild(overlay);
    
    setupContinueListener();
}


function triggerGameOver() { 
    isGameOver = true;
    stopBGM();
    stopTimer();
    if (scoreIntervalId) {
        clearInterval(scoreIntervalId);
        scoreIntervalId = null;
    }
    
    problemTextElement.style.opacity = '0'; 
    sansAreaElement.style.opacity = '0';  
    battleBoxElement.style.opacity = '0'; 
    
    infoAreaElement.style.zIndex = '30'; 
    infoAreaElement.style.backgroundColor = '#000';
    bodyElement.style.backgroundColor = '#000'; 
    playAudio(shatterAudio);
    
    setTimeout(() => {
        
        gameOverBGM = new Audio(GAMEOVER_BGM_PATH);
        gameOverBGM.loop = false;
        gameOverBGM.volume = 0.6;
        gameOverBGM.play().catch(e => console.log("ゲームオーバーBGM再生エラー:", e));
        
        const overlay = document.createElement('div');
        overlay.id = 'game-over-screen';
        overlay.className = 'game-overlay'; 
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#000'; 
        overlay.style.zIndex = '20'; 
        overlay.innerHTML = `
            <img src="${GAMEOVER_IMAGE_PATH}" alt="GAME OVER" style="display: block; margin: 15vh auto 20px; width: 300px;">
            <p id="continue-text" style="color: #fff; font-size: 20px; text-align: center; margin-top: 10px;">CONTINUE [SPACE]</p>
        `;
        document.body.appendChild(overlay);
        setupContinueListener();
    }, 4000); 
}


// ★★★ 修正箇所: setupContinueListenerをページ再読み込みに置き換え (要求1) ★★★
function setupContinueListener() { 
    const continueHandler = (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            document.removeEventListener('keydown', continueHandler); 
            
            // 🌟 修正点: SAVEPOINT_SOUND_PATH (文字列) から Audio オブジェクトを生成 🌟
            try { 
                // 新しい Audio オブジェクトをファイルパスから作成
                const savepointAudio = new Audio(SAVEPOINT_SOUND_PATH); 
                // 作成した Audio オブジェクトを playAudio 関数に渡す
                playAudio(savepointAudio); 
            } catch (error) {
                // エラーが発生しても、リロード処理は続行
                console.error("Failed to play savepoint audio:", error); 
            }
            
            // 🌟 1秒後 ページ読み込み(window.location.reload)を行う 🌟
            setTimeout(() => {
                window.location.reload(); 
            }, 2000); // 1000ミリ秒 = 1秒
        }
    };
    document.addEventListener('keydown', continueHandler);
}


// ★★★ 新規追加: グローバルキーリスナーでFキーとESCキーの挙動を制御 (要求2, 3) ★★★
function addGlobalKeyListener() {
    document.addEventListener('keydown', (e) => {
        // F1〜F12 キーは誤タイプにならないように、ブラウザの標準動作を許可（何もしない）
        // ※誤タイプ防止は battleBoxElement のリスナー側で実施。ここではブラウザ標準動作のpreventDefaultをしない。
        
        // ESC キーが押されたら強制的に再読み込み（リスタート）
        if (e.code === 'Escape') {
            e.preventDefault(); // ブラウザ標準の動作（例：フルスクリーン解除など）を防止
            window.location.reload();
            return;
        }
    });
}


// =========================================================
// 10. ゲームの初期化/開始トリガー
// =========================================================

let startKeyListener = null; 

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    // ★修正箇所: グローバルキーリスナーの追加 ★
    addGlobalKeyListener(); 
    
    startKeyListener = startGameOnKeyPress;
    document.addEventListener('keydown', startKeyListener);
});

function initializeGame() {
    const gameOverScreen = document.getElementById('game-over-screen');
    if (gameOverScreen) {
        gameOverScreen.remove();
    }
    
    if (scoreIntervalId) {
        clearInterval(scoreIntervalId);
        scoreIntervalId = null;
    }
    
    // ★★★ 問題①②の解決策 ★★★
    // ① sans-areaの画像を初期画像に戻す (問題②の解決)
    sansImageElement.src = 'sans_close_stop.gif'; 
    
    // ② 動作中のすべてのBGMを停止させる (問題①の解決策の補強)
    stopBGM(); 
    //-------------------------
    
    currentMaxHP = MAX_HP_INITIAL;
    currentHP = currentMaxHP; 
    
    isGameOver = false;
    mistakeCount = 0;
    currentDialogueIndex = 0;
    typedRomaji = '';
    
    totalCorrectKeystrokes = 0;
    gameStartTime = 0;
    updateScoreDisplay(); 

    updateHPDisplay(); 
    mistakesValueElement.textContent = mistakeCount;
    sansImageElement.style.opacity = '1';
    
    sansAreaElement.style.opacity = '1';
    battleBoxElement.style.opacity = '1';
    infoAreaElement.style.opacity = '1';
    infoAreaElement.style.zIndex = '10'; 
    infoAreaElement.style.backgroundColor = '#000'; 
    infoAreaElement.style.color = 'white'; 
    bodyElement.style.backgroundColor = '#000'; 
    
    problemTextElement.style.opacity = '1';
    problemTextElement.style.color = 'white';
    problemTextElement.style.position = 'relative'; 
    problemTextElement.style.zIndex = '5'; 
    problemTextElement.innerHTML = "Press [SPACE] to start!";
    battleBoxElement.innerHTML = ''; 
    battleBoxElement.tabIndex = 0;
}

function startGameOnKeyPress(e) {
    if (gameInitialized) {
        return;
    }

    if (e.code === 'Space') {
        e.preventDefault(); 
        
        document.removeEventListener('keydown', startKeyListener);
        startKeyListener = null;
        
        startGameLogic();
    }
}

function startGameLogic() { 
    if (!gameInitialized) {


        gameInitialized = true;
        startTimer();
        
        // startBGM(MEGALOVANIA_PATH); // ★修正: ゲーム開始時のBGM再生を削除
        loadNextDialogue(); 
        
        gameStartTime = Date.now();
        scoreIntervalId = setInterval(updateScoreDisplay, 100); 
        
        gameInitialized = true;
        
        battleBoxElement.focus(); 
    }
}
