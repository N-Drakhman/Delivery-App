<script setup>
import axios from "axios";
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  menuItem: Object,
  Required: true,
});

const favorite = ref(false);

const count = ref(1);

const formattedCount = computed(() => {
  return count.value < 10 ? `0${count.value}` : `${count.value}`;
});

function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}
</script>

<template>
  <div class="card">
    <button @click="favorite = !favorite" class="favorite">
      <transition name="icon-fade" mode="out-in">
        <i
          :key="favorite"
          :class="favorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
        ></i>
      </transition>
    </button>

    <img class="menu-item-image" alt="dish image" :src="menuItem.img" />

    <div class="card-title">
      {{ menuItem.title }}
      <span> &rsaquo; </span>
    </div>

    <div class="card-description">{{ menuItem.description }}</div>

    <div class="card-price">
      <i class="pi pi-dollar"></i>{{ menuItem.price }}
    </div>

    <div class="counter">
      <div class="counter-panel">
        <button
          @click="decrement"
          class="counter-decrement"
          :disabled="count === 0"
        >
          <i class="pi pi-minus"></i>
        </button>

        <div class="counter-count">
          <div>
            {{ formattedCount }}
          </div>
        </div>

        <button
          @click="increment"
          class="counter-increment"
          :disabled="count === 99"
        >
          <i class="pi pi-plus"></i>
        </button>
      </div>

      <button class="counter-include">include</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Transition styles */
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.icon-fade-enter,
.icon-fade-leave-to {
  transform: scale(1.1);
  opacity: 0;
}

.card {
  width: 304px;
  height: 462px;
  background: #00070a;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 24px;
  position: relative;
  color: #e1e1e6;
  text-align: center;

  & button {
    background-color: #00070a;
    border: none;
    color: #e1e1e6;
    cursor: pointer;
  }

  & .favorite {
    position: absolute;
    top: 16px;
    right: 18px;

    &:hover {
      color: white;
    }

    & i {
      font-size: 22px;
    }
  }

  & .menu-item-image {
    height: 176px;
  }

  & .counter {
    width: 80%;
    height: 48px;

    display: flex;
    gap: 16px;
    align-items: center;

    &-panel {
      display: flex;
      gap: 14px;
      align-items: center;
    }

    &-increment,
    &-decrement {
      width: 24px;
      height: 24px;
      border: none;
      border-radius: 4px;
      padding: 4px;

      & i {
        font-size: 16px;
      }

      &:hover {
        transition: all 0.2s ease;
        background: #0d1d25;
      }

      &:active {
        background: #001119;
      }

      &:disabled {
        color: #ffffff40;
      }
    }

    &-count {
      font-size: 20px;
      line-height: 32px;
      font-weight: 700;
      width: 24px;
    }

    &-include {
      font-size: 14px;
      line-height: 24px;
      background: #750310;
      width: 92px;
      height: 48px;
      padding: 12px 24px;
      border-radius: 5px;

      &:hover {
        background: #92000e;
        transition: all 0.2s ease;
      }

      &:active {
        background: #ab4d55;
        transition: all 0.2s ease;
      }
    }
  }

  &-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 33.6px;
    white-space: nowrap;
    & span {
      font-size: 28px;
      font-weight: 900;
    }
  }

  &-description {
    color: #c4c4cc;
    font-size: 14px;
    line-height: 22.4px;
  }

  &-price {
    color: #82f3ff;
    font-size: 32px;
    font-weight: 400;
    line-height: 51.2px;

    & i {
      font-size: 28px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .card {
    width: 260px;
    height: 362px;
    gap: 14px;

    & .menu-item-image {
      height: 144px;
    }

    & .counter {
      width: 100%;
      height: 80px;
      gap: 12px;
      flex-direction: column;

      &-increment,
      &-decrement {
        width: 24px;
        height: 24px;
      }

      &-count {
        font-size: 16px;
        line-height: 16px;
        font-weight: 400;
      }

      &-include {
        font-size: 14px;
        width: 100%;
        height: 40px;
        padding: 4px 24px;
      }
    }

    &-title {
      font-size: 18px;
      font-weight: 600;
      line-height: 26px;
      & span {
        font-size: 19px;
      }
    }

    &-description {
      display: none;
    }

    &-price {
      font-size: 24px;
      line-height: 24px;

      & i {
        font-size: 20px;
      }
    }
  }
}

@media screen and (max-width: 778px) {
  .card {
    width: 210px;
    height: 292px;

    & .menu-item-image {
      height: 88px;
    }

    & .counter {
      &-include {
        height: 32px;
      }
    }

    &-title {
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      & span {
        font-size: 16px;
      }
    }

    &-price {
      font-size: 16px;
      line-height: 16px;
      & i {
        font-size: 14px;
      }
    }
  }
}
</style>
