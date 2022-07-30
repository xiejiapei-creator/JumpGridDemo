System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Prefab, instantiate, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, BlockType, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
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

      _export("GameManager", GameManager = (_dec = ccclass("GameManager"), _dec2 = property({
        type: Prefab
      }), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "cubePrfb", _descriptor, this);

          _initializerDefineProperty(this, "roadLength", _descriptor2, this);

          this._road = [];
        }

        start() {
          this.generateRoad();
        } // 生成道路


        generateRoad() {
          // 防止游戏重新开始时，赛道还是旧的赛道
          // 因此，需要移除旧赛道，清除旧赛道数据
          this.node.removeAllChildren(); // 创建新的赛道

          this._road = []; // 确保游戏运行时，人物一定站在实路上

          this._road.push(BlockType.BT_STONE); // 确定好每一格赛道类型


          for (var i = 1; i < this.roadLength; i++) {
            // 如果上一格赛道是坑，那么这一格一定不能为坑
            if (this._road[i - 1] === BlockType.BT_NONE) {
              this._road.push(BlockType.BT_STONE);
            } else {
              this._road.push(Math.floor(Math.random() * 2));
            }
          } // 根据赛道类型生成赛道


          for (var j = 0; j < this._road.length; j++) {
            var block = this.spawnBlockByType(this._road[j]); // 判断是否生成了道路，因为 spawnBlockByType 有可能返回坑（值为 null）

            if (block) {
              this.node.addChild(block);
              block.setPosition(j, -1.5, 0);
            }
          }
        } // 通过砖块类型生成相应砖块


        spawnBlockByType(type) {
          if (!this.cubePrfb) {
            return null;
          }

          var block = null; // 赛道类型为实路才生成

          switch (type) {
            case BlockType.BT_STONE:
              block = instantiate(this.cubePrfb);
              break;
          }

          return block;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cubePrfb", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "roadLength", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=20ec45707bdde66b78ad90b352330f5b2ccdf01d.js.map