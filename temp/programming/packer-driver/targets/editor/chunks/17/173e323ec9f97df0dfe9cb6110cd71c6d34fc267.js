System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Prefab, instantiate, Node, Label, CCInteger, Vec3, PlayerController, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, BlockType, GameState, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerController(extras) {
    _reporterNs.report("PlayerController", "./PlayerController", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Label = _cc.Label;
      CCInteger = _cc.CCInteger;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      PlayerController = _unresolved_2.PlayerController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "326d6DtDjZPxJ4SwTMVuYAe", "GameManager", undefined);

      ({
        ccclass,
        property
      } = _decorator); // 赛道格子类型，坑（BT_NONE）或者实路（BT_STONE）

      (function (BlockType) {
        BlockType[BlockType["BT_NONE"] = 0] = "BT_NONE";
        BlockType[BlockType["BT_STONE"] = 1] = "BT_STONE";
      })(BlockType || (BlockType = {}));

      ;

      (function (GameState) {
        GameState[GameState["GS_INIT"] = 0] = "GS_INIT";
        GameState[GameState["GS_PLAYING"] = 1] = "GS_PLAYING";
        GameState[GameState["GS_END"] = 2] = "GS_END";
      })(GameState || (GameState = {}));

      ;

      _export("GameManager", GameManager = (_dec = ccclass("GameManager"), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: CCInteger
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: _crd && PlayerController === void 0 ? (_reportPossibleCrUseOfPlayerController({
          error: Error()
        }), PlayerController) : PlayerController
      }), _dec6 = property({
        type: Label
      }), _dec(_class = (_class2 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "cubePrfb", _descriptor, this);

          _initializerDefineProperty(this, "roadLength", _descriptor2, this);

          this._road = [];

          _initializerDefineProperty(this, "startMenu", _descriptor3, this);

          _initializerDefineProperty(this, "playerCtrl", _descriptor4, this);

          _initializerDefineProperty(this, "stepsLabel", _descriptor5, this);
        }

        start() {
          var _this$playerCtrl;

          this.curState = GameState.GS_INIT;
          (_this$playerCtrl = this.playerCtrl) == null ? void 0 : _this$playerCtrl.node.on('JumpEnd', this.onPlayerJumpEnd, this);
        }

        init() {
          // 激活主界面
          if (this.startMenu) {
            this.startMenu.active = true;
          } // 生成赛道


          this.generateRoad();

          if (this.playerCtrl) {
            // 禁止接收用户操作人物移动指令
            this.playerCtrl.setInputActive(false); // 重置人物位置

            this.playerCtrl.node.setPosition(Vec3.ZERO); // 重置已经移动的步长数据

            this.playerCtrl.reset();
          }
        }

        set curState(value) {
          switch (value) {
            case GameState.GS_INIT:
              this.init();
              break;

            case GameState.GS_PLAYING:
              if (this.startMenu) {
                this.startMenu.active = false;
              }

              if (this.stepsLabel) {
                this.stepsLabel.string = '0'; // 将步数重置为0
              } // 会出现的现象就是，游戏开始的瞬间人物已经开始移动
              // 因此，这里需要做延迟处理


              setTimeout(() => {
                if (this.playerCtrl) {
                  this.playerCtrl.setInputActive(true);
                }
              }, 0.1);
              break;

            case GameState.GS_END:
              break;
          }
        }

        generateRoad() {
          // 防止游戏重新开始时，赛道还是旧的赛道
          // 因此，需要移除旧赛道，清除旧赛道数据
          this.node.removeAllChildren();
          this._road = []; // 确保游戏运行时，人物一定站在实路上

          this._road.push(BlockType.BT_STONE); // 确定好每一格赛道类型


          for (let i = 1; i < this.roadLength; i++) {
            // 如果上一格赛道是坑，那么这一格一定不能为坑
            if (this._road[i - 1] === BlockType.BT_NONE) {
              this._road.push(BlockType.BT_STONE);
            } else {
              this._road.push(Math.floor(Math.random() * 2));
            }
          } // 根据赛道类型生成赛道


          let linkedBlocks = 0;

          for (let j = 0; j < this._road.length; j++) {
            if (this._road[j]) {
              ++linkedBlocks;
            }

            if (this._road[j] == 0) {
              if (linkedBlocks > 0) {
                this.spawnBlockByCount(j - 1, linkedBlocks);
                linkedBlocks = 0;
              }
            }

            if (this._road.length == j + 1) {
              if (linkedBlocks > 0) {
                this.spawnBlockByCount(j, linkedBlocks);
                linkedBlocks = 0;
              }
            }
          }
        }

        spawnBlockByCount(lastPos, count) {
          let block = this.spawnBlockByType(BlockType.BT_STONE);

          if (block) {
            this.node.addChild(block);
            block == null ? void 0 : block.setScale(count, 1, 1);
            block == null ? void 0 : block.setPosition(lastPos - (count - 1) * 0.5, -1.5, 0);
          }
        }

        spawnBlockByType(type) {
          if (!this.cubePrfb) {
            return null;
          }

          let block = null;

          switch (type) {
            case BlockType.BT_STONE:
              block = instantiate(this.cubePrfb);
              break;
          }

          return block;
        }

        onStartButtonClicked() {
          // 点击主界面 play 按钮，开始游戏
          this.curState = GameState.GS_PLAYING;
        }

        checkResult(moveIndex) {
          if (moveIndex < this.roadLength) {
            // 跳到了坑上
            if (this._road[moveIndex] == BlockType.BT_NONE) {
              this.curState = GameState.GS_INIT;
            }
          } else {
            // 跳过了最大长度
            this.curState = GameState.GS_INIT;
          }
        }

        onPlayerJumpEnd(moveIndex) {
          if (this.stepsLabel) {
            // 因为在最后一步可能出现步伐大的跳跃，但是此时无论跳跃是步伐大还是步伐小都不应该多增加分数
            this.stepsLabel.string = '' + (moveIndex >= this.roadLength ? this.roadLength : moveIndex);
          } // 检查当前下落道路的类型，获取结果


          this.checkResult(moveIndex);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cubePrfb", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "roadLength", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "startMenu", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playerCtrl", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "stepsLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=173e323ec9f97df0dfe9cb6110cd71c6d34fc267.js.map