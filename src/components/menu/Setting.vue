<template>

    <div class="setting">
        <span @click="switch" class="icon-setting"></span>
        <div class="settingbox" v-show="isedit">
            <div class="card">
                <div class="card-content white-text">
                    <span class="card-title">Setting</span>
                    <ul class="setting-item">
                        <li>
                            <span>语言</span>
                            <div class="right">
                                <span class="teal-text text-lighten-1">中文</span>&nbsp;/&nbsp;<span>English</span>
                            </div>
                        </li>
                        <li>
                            <span>自动更换壁纸</span>
                            <div class="right">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox">
                                        <span class="lever"></span>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="card-action ">
                    <a href="#" class="grey-text text-lighten-1">Prowered By VUE.js</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Setting',
        data: () => {
            return {
                isedit: false
            }
        },
        methods: {
            switch () {
                this.isedit = !this.isedit
            },

        }
    };
</script>

<style>
    .switch {
        display: inline-block;
    }

    .setting {
        position: absolute;
        bottom: 0rem;
        left: 0rem;
    }

    .icon-setting {
        position: absolute;
        left: 2rem;
        bottom: 2rem;
    }

    .settingbox {
        position: absolute;
        bottom: 5rem;
        left: .5rem;
        width: 30rem;
        border-radius: 2px;
    }

    .card {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .setting-item li {
        border-bottom: 1px rgba(255, 255, 255, .5) solid;
        padding-bottom: .5rem;
        margin-bottom: .5rem;
    }
</style>
