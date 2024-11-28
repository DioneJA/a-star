<template>
    <div>
        <transition name="fade-slide">
            <div v-if="visible" :class="['error-popup', position]" @click.self="closePopup">
                <div class="error-content">
                    <p>{{ _label }}</p>
                    <button @click="closePopup">{{ $t("close") }}</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Popup',
    props: {
        _visible: {
            type: Boolean,
            default: false,
        },
        _label: {
            type: String,
            default: "No message",
        }
    },
    data: function () {
        return {
            position: 'bottom',
            timeout: null
        };
    },
    computed: {
        visible: {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this.$emit('update:_visible', value);
                this.$emit('change:_visible', value);
            },
        },
    },
    methods: {
        closePopup: function () {
            this.visible = false;
            this.$emit('close');
        },
    },
    watch: {
        _visible: function (value) {
            if (value) {
               this.timeout = setTimeout(() => {
                   this.closePopup();
               }, 3000);
            } else {
                this.closePopup();
                clearTimeout(this.timeout);
            }
        }
    }
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.error-popup {
    position: fixed;
    width: 90%;
    max-width: 400px;
    padding: 16px;
    background-color: rgba(255, 0, 0, 0.9);
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 1000;
    font-weight: bold;
}

.error-popup.center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.error-popup.bottom {
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
}

.error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

button {
    padding: 4px 8px;
    background-color: white;
    color: red;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

button:hover {
    background-color: #f8d7da;
}
</style>