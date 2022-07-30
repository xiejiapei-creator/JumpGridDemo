System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Vec3, input, Input, Animation, SkeletalAnimation, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, PlayerController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      input = _cc.input;
      Input = _cc.Input;
      Animation = _cc.Animation;
      SkeletalAnimation = _cc.SkeletalAnimation;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ddfb1tkyx9BEqyM7xmfE5Db", "PlayerController", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerController", PlayerController = (_dec = ccclass("PlayerController"), _dec2 = property({
        type: Animation
      }), _dec3 = property({
        type: SkeletalAnimation
      }), _dec(_class = (_class2 = class PlayerController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "BodyAnim", _descriptor, this);

          _initializerDefineProperty(this, "CocosAnim", _descriptor2, this);

          this._startJump = false;
          this._jumpStep = 0;
          this._curJumpTime = 0;
          this._jumpTime = 0.3;
          this._curJumpSpeed = 0;
          this._curPos = new Vec3();
          this._deltaPos = new Vec3(0, 0, 0);
          this._targetPos = new Vec3();
          this._curMoveIndex = 0;
        }

        start() {}

        reset() {
          this._curMoveIndex = 0;
        }

        setInputActive(active) {
          if (active) {
            input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
          } else {
            input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
          }
        }

        onMouseUp(event) {
          if (event.getButton() === 0) {
            this.jumpByStep(1);
          } else if (event.getButton() === 2) {
            this.jumpByStep(2);
          }
        }

        jumpByStep(step) {
          if (this._startJump) {
            return;
          }

          this._startJump = true;
          this._jumpStep = step;
          this._curJumpTime = 0;
          this._curJumpSpeed = this._jumpStep / this._jumpTime;
          this.node.getPosition(this._curPos);
          Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep, 0, 0));

          if (this.CocosAnim) {
            this.CocosAnim.getState('cocos_anim_jump').speed = 3.5; //跳跃动画时间比较长，这里加速播放

            this.CocosAnim.play('cocos_anim_jump'); //播放跳跃动画
          } // if (this.BodyAnim) {
          //     if (step === 1) {
          //         this.BodyAnim.play('oneStep');
          //     } else if (step === 2) {
          //         this.BodyAnim.play('twoStep');
          //     }
          // }


          this._curMoveIndex += step;
        }

        onOnceJumpEnd() {
          if (this.CocosAnim) {
            this.CocosAnim.play('cocos_anim_idle');
          }

          this.node.emit('JumpEnd', this._curMoveIndex);
        }

        update(deltaTime) {
          if (this._startJump) {
            this._curJumpTime += deltaTime;

            if (this._curJumpTime > this._jumpTime) {
              // end
              this.node.setPosition(this._targetPos);
              this._startJump = false;
              this.onOnceJumpEnd();
            } else {
              // tween
              this.node.getPosition(this._curPos);
              this._deltaPos.x = this._curJumpSpeed * deltaTime;
              Vec3.add(this._curPos, this._curPos, this._deltaPos);
              this.node.setPosition(this._curPos);
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "BodyAnim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "CocosAnim", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4679472075fa3103e560e13c33132cfa2ba6651c.js.map