import { _decorator, Component, Vec3, input, Input, EventMouse, Animation, SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {


    // 引用模型动画的变量
    @property({type: SkeletalAnimation})
    public CocosAnim: SkeletalAnimation|null = null;

    // 是否接收到跳跃指令
    private _startJump: boolean = false;

    // 跳跃步长
    private _jumpStep: number = 0;
    // 每次跳跃时长
    private _jumpTime: number = 0.3;

    // 当前跳跃速度
    private _curJumpSpeed: number = 0;
    // 当前跳跃时间
    private _curJumpTime: number = 0;
    // 当前角色位置
    private _curPos: Vec3 = new Vec3();
    // 每次跳跃过程中，当前帧移动位置差
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    // 记录角色跳了多少步
    private _curMoveIndex = 0;

    // 角色目标位置
    private _targetPos: Vec3 = new Vec3();

    // 是否监听鼠标点击事件
    setInputActive(active: boolean) {
        if (active) {
            input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        } else {
            input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        }
    }

    // 按下鼠标
    onMouseUp(event: EventMouse) {
        if (event.getButton() === 0) {
            this.jumpByStep(1);
        } else if (event.getButton() === 2) {
            this.jumpByStep(2);
        }
    }

    // 跳跃指定步数
    jumpByStep(step: number) {
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
            this.CocosAnim.getState('cocos_anim_jump').speed = 3.5; // 跳跃动画时间比较长，这里加速播放
            this.CocosAnim.play('cocos_anim_jump'); // 播放跳跃动画
        }

        this._curMoveIndex += step;
    }

    // 更新数据
    update (deltaTime: number) {
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

    // 每次跳跃结束发出消息
    onOnceJumpEnd() {
        if (this.CocosAnim) {
            this.CocosAnim.play('cocos_anim_idle');
        }

        this.node.emit('JumpEnd', this._curMoveIndex);
    }

    // 重置当前角色位置
    reset() {
        this._curMoveIndex = 0;
    }
}


