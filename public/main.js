var phaserwidth = window.innerWidth;
var phaserheight = window.innerHeight;
var phaserhei = 480;
var phaserwid = phaserhei*phaserwidth/phaserheight;


var game = new Phaser.Game(phaserwid,phaserhei , Phaser.AUTO, 'game');
var jumpTimer = 0
var trigger = {left:0,right:0,up:0,space:0};
var flag= {p1:0,p2:0,p3:0};
var coinnumber = 0;
var next = {
    preload: function () {
    },
    create: function () {
        $('#game').css({ display: 'none' })
        
    },
    update: function () {
        
    },
    render: function () {

    }
};
game.state.add('next', next);
function dowm() {
    switch (this.key) {
        case "l":
            trigger.left =1;
            break;
        case "r":
            trigger.right = 1;
            break;
        case "up":
            trigger.up = 1;
            break;
        case "space":
            trigger.space = 1
            break;    
        default:
            break;
    }
}
function up() {
    switch (this.key) {
        case "l":
            trigger.left = 0
            break;
        case "r":
            trigger.right = 0
            break;
        case "up":
            trigger.up = 0
            break;
        case "space":
            trigger.space = 0
            break;
        default:
            break;
    }       
} 
var first =  {
  
  preload:()=>{
    game.load.tilemap('map', 'assets/json/map4.json', null,Phaser.Tilemap.TILED_JSON)
	game.load.image('road2', 'assets/img/road2.png')
	game.load.image('red2', 'assets/img/red2.png')
	game.load.image('cas1', 'assets/img/cas1.png')
	game.load.image('cloud', 'assets/img/cloud.jpg')
    game.load.image('leftb', 'assets/img/leftb.png')
	game.load.image('rightb', 'assets/img/rightb.png')
	game.load.image('jumpb', 'assets/img/jumpb.png')
	game.load.image('enterb', 'assets/img/enterb.png')
	game.load.image('mark', 'assets/img/mark.png')
	game.load.image('vend', 'assets/img/vend.png')
	game.load.image('house', 'assets/img/house.png')
	game.load.image('coin','assets/img/gold.png')
    game.load.spritesheet('cat_player','assets/img/cat3.png', 316, 276)
  },
  create:()=> {
	  //物理系統設定
	game.physics.startSystem(Phaser.Physics.ARCADE)
	game.physics.arcade.gravity.y = 380
	game.time.desiredFps = 30
	/*
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.refresh();

	canvas_width = window.innerWidth * window.devicePixelRatio;
	canvas_height = window.innerHeight * window.devicePixelRatio;
	aspect_ratio = canvas_width / canvas_height;
	if (aspect_ratio > 1) scale_ratio = canvas_height / canvas_height_max;
	else scale_ratio = canvas_width / canvas_width_max;*/
	//視窗設定
	game.scale.scaleMode  = Phaser.ScaleManager.SHOW_ALL
	game.scale.pageAlignVertically = true
	game.scale.pageAlignHorizontally = true
    Phaser.Canvas.setImageRenderingCrisp(game.canvas)
	//地圖載入
    map = game.add.tilemap('map')
	map.addTilesetImage('red2','red2')
	map.addTilesetImage('road2','road2')
    map.addTilesetImage('cas1','cas1')
	map.addTilesetImage('cloud','cloud')
	map.createLayer('lay 3')
    layer = map.createLayer('lay 2')
	map.createLayer('lay 1')
	map.setCollisionBetween(64,70,true,layer)
	//物件
	vend = game.add.sprite(1500,(phaserhei-214),'vend')
	vend.scale.set(0.06)
	house = game.add.sprite(2200,(phaserhei-308),'house')
	house.scale.set(0.4)
	inter_group = game.add.physicsGroup()
	inter_group.add(house)
	inter_group.add(vend)
	house.body.allowGravity = false
	vend.body.allowGravity = false
	house.body.immovable = true
	vend.body.immovable = true
	
	coins = game.add.physicsGroup()
	for(var i = 0;i < 10;i++) {
		coin = coins.create(100+i*200,(phaserhei-128),'coin')
		coin.scale.set(0.6)
		coin.body.allowGravity = false
		//coin.body.immovable = true
	}
	coinText = game.add.text(20,50,'硬幣: 0', {fontSize: '24px', fill: '#ffff00'});
	coinText.fixedToCamera = true
	//玩家
	cat_player = game.add.sprite(1500,100, 'cat_player')
	game.physics.enable(cat_player,Phaser.Physics.ARCADE)
	cat_player.scale.set(0.25)
    cat_player.facing = 'right'
	//驚嘆號
	mark = game.add.sprite(1500,100,'mark')
	mark.scale.set(0.33)
	mark.visible = false
	game.physics.enable(mark,Phaser.Physics.ARCADE)
	mark.body.allowGravity = false
	mark.body.immovable = true
	//玩家動畫設定
    cat_player.animations.add('left', [10,9,8,7], 18 , true)
    cat_player.animations.add('right', [1,2,3,4], 18, true)
	cat_player.animations.add('rightup', [16,17,18], 3,false)
	cat_player.animations.add('leftup', [25,24,23], 3,false)
	cat_player.animations.add('rightupst', [14,15], 2,false)
	cat_player.animations.add('leftupst', [27,26], 2,false)
	cat_player.animations.add('rightdown', [19,20], 2,false)
	cat_player.animations.add('leftdown', [22,21], 2,false)/*
	cat_player.animations.add('jumpdownleft',,2,false)
	cat_player.animations.add('jumpdownright',,2,false)*/
	//世界設定
	game.world.setBounds(0,0, 3200, 480)
	cat_player.body.collideWorldBounds = true
	game.camera.follow(cat_player)
	
	//設置操縱按鈕
	cursors = game.input.keyboard.createCursorKeys()
	this.cursors = game.input.keyboard.createCursorKeys(); 
    this.custom = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	//左
	this.button_L = game.add.button(0, (phaserhei-75), 'leftb');
	this.button_L.scale.set(0.5);
    this.button_L.onInputDown.add( dowm,{key:"l"},this);
    this.button_L.onInputUp.add(up, { key: "l" }, this);  
    this.button_L.fixedToCamera = true;
    //右
    this.button_R = game.add.button(68, (phaserhei-75), 'rightb');
	this.button_R.scale.set(0.5);
    this.button_R.onInputDown.add(dowm, { key: "r" }, this);
    this.button_R.onInputUp.add(up, { key: "r" }, this);
    this.button_R.fixedToCamera = true;      
    //上
    this.button_UP = game.add.button((phaserwid-136), (phaserhei-75), 'jumpb');
	this.button_UP.scale.set(0.5);
    this.button_UP.onInputDown.add(dowm, { key: "up" }, this);
    this.button_UP.onInputUp.add(up, { key: "up" }, this);
    this.button_UP.fixedToCamera = true; 
	//觸發事件
	this.button_SPACE = game.add.button((phaserwid-68), (phaserhei-75), 'enterb');
	this.button_SPACE.scale.set(0.5);
    this.button_SPACE.onInputDown.add(dowm, { key: "space" }, this);
    this.button_SPACE.onInputUp.add(up, { key: "space" }, this); 
    this.button_SPACE.fixedToCamera = true;   
   },

  update:()=>{
	//this.custom.isDown
	game.physics.arcade.collide(this.cat_player, this.layer);
	
	//移動驚嘆號
	mark.visible = false
	game.physics.arcade.overlap(this.cat_player, this.inter_group,function(){
		mark.body.x = cat_player.body.x+35
		mark.body.y = cat_player.body.y-50
		mark.visible = true
	});
	//硬幣
	game.physics.arcade.overlap(cat_player, coins,function(cat_player,coin){
		coin.kill()
		coinnumber ++
		coinText.setText("硬幣: " + coinnumber)
	},null,this);
	//方向控制
    if ((cursors.left.isDown || trigger.left === 1)&& cat_player.body.onFloor()) {
         this.cat_player.body.velocity.x = -200
        this.cat_player.play('left')
        if (this.cat_player.facing !== 'left')
		    this.cat_player.facing = 'left'
    }

    else if ((cursors.right.isDown || trigger.right === 1)&& cat_player.body.onFloor()) {	
        this.cat_player.body.velocity.x = 200
        this.cat_player.play('right')
        if (this.cat_player.facing !== 'right') 
            this.cat_player.facing = 'right'
	}
	else if ((cursors.up.isDown || trigger.up === 1)&& cat_player.body.onFloor()&& game.time.now > jumpTimer ) {	
	    if (this.cat_player.facing === 'right')  {
           this.cat_player.play('rightup')			
           this.cat_player.body.velocity.x = 200
		   this.cat_player.body.velocity.y += -200
		   jumpTimer = game.time.now + 750
		}
		else if (this.cat_player.facing === 'left'){
		   this.cat_player.play('leftup')
		   this.cat_player.body.velocity.x = -200
		   this.cat_player.body.velocity.y += -200
		   jumpTimer = game.time.now + 750
		}
	}
	else {
	    if(this.cat_player.body.onFloor()){
			this.cat_player.body.velocity.x = 0
			if (this.cat_player.facing === 'left') cat_player.frame = 9
            if (this.cat_player.facing === 'right') cat_player.frame = 0
			//this.cat_player.animations.stop()
        }
    }
	//進入關卡
    if (this.cat_player.body.x > 310 && this.cat_player.body.x < 660) {//
		if(this.flag.p1 != 1){
			mark.body.x = cat_player.body.x+35
			mark.body.y = cat_player.body.y-50
			mark.visible = true
			if (this.custom.isDown || trigger.space == 1) {
				this.flag.p1 = 1
				game.state.start('next')
			}
		}
    } 
  },
  
   render:()=>{
	   //game.debug.spriteInfo(cat_player,32,32);
   },
      //no
};
game.state.add('first', first);
game.state.add('next', next);
game.state.start('first');

