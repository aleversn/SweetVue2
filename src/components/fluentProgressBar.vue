<template>
<div class="fluent-progress-bar" :style="{width: width}">
    <section class="bar" :style="{height: height, transform: `rotateX(${rotate})`}">
        <div class="bar-face back" :style="{transform: `rotateX(-90deg) translateZ(-${translateZ})`}"></div>
        <p class="bar-face back percentage" :style="{width: `${percentage}%`, transform: `rotateX(-90deg) translateZ(-${translateZ})`}"></p>
        <div class="bar-face floor"></div>
        <p class="bar-face floor percentage" :style="{width: `${percentage}%`}"></p>
        <div class="bar-face roof" :style="{transform: `translateZ(${translateZ})`}"></div>
        <p class="bar-face roof percentage" :style="{width: `${percentage}%`, transform: `translateZ(${translateZ})`}"></p>
        <div class="bar-face front"></div>
        <p class="bar-face front percentage" :style="{width: `${percentage}%`}"></p>
        <div class="indicator" :style="{'margin-left': `${percentage}%`}">{{percentage}}%</div>
    </section>
</div>
</template>

<style lang="scss" scoped>
.fluent-progress-bar
{
    position: relative;
    width: 200px;
    height: auto;
    margin: 35px 0px;
	perspective: 90vh;  //视口90%//
	perspective-origin: 50% 50%;
	transition: all 0.3s ease;

    .bar
    {
        position: relative;
        width: 100%;
		height: 35px;
        display: flex;
        flex-direction: column;
        transform: rotateX(55deg);  //整体翻转//
        transform-style: preserve-3d;

        .bar-face
        {
            position: absolute;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.5);
            display: flex;
            flex-direction: column;
            transform-origin: 50% 100%;

            &.front
            {
                transform: rotateX(-90deg);
            }
            &.floor
            {
				box-shadow: 0 1.3em 1.2em -0.4em rgba(0, 0, 70, 0.25), 0 -2em 15em 0.5em #4d5075, 0 -0.75em 25em 10em rgba(255, 255, 255, 0.4);
			}
            &.roof
            {
				transform: translateZ(35px);
			}
			&.back
            {
				transform: rotateX(-90deg) translateZ(-35px);
			}
            &.percentage
            {
                position: absolute;
                width: 50%;
                height: 100%;
                bottom: 0;
                margin: 0;
                background-color: rgba(149, 65, 105, 0.6);
                display: block;
                box-shadow: 0 1.6em 7em -0.3em rgba(149, 65, 105, 0.5);
            }
        }
    }

    .indicator
    {
        width: 8vh;
        height: 8vh;
        background: rgba(149, 65, 105, 1);
        color: white;
        text-align: center;
        font-size: 1.8vh;
        font-weight: 900;
        line-height: 3.5;
        transform: translateY(6vh);
        box-shadow: 0px 15px 35px rgba(236, 0, 113, 0.3);

        &:before
        {
            position: absolute;
            content: "";
            left: 0;
            right: 0;
            margin: auto;
            top: -6px;
            width: 4vh;
            height: 4vh;
            background: rgba(149, 65, 105, 1);
            z-index: -1;
            transform: rotate(45deg);
        }
    }
}
</style>

<script>
export default {
    name: 'f-progress-bar',
    props: {
        width: {
            type: String,
            default: '200px'
        },
        height: {
            type: String,
            default: '35px'
        },
        rotate: {
            type: String,
            default: '55deg'
        },
        percentage: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            translateZ: '',
            rotateX: ''
        }
    },
    watch: {
        height (val) {
            this.translateZ = val;
        },
        rotate (val) {
            this.rotateX = val;
        }
    },
    mounted () {
        this.translateZ = this.height;
        this.rotateX = this.rotate;
    }
}
</script>
