<script setup>
import axios from "axios";
import { ref, computed, defineProps, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDeliveryStore } from "@/stores/delivery-store";
import BackButton from "@/components/BackButton.vue";
const route = useRoute();
const router = useRouter();
const dishId = route.params.id;

const deliveryStore = useDeliveryStore();

onBeforeMount(() => {
  deliveryStore.fetchItem(dishId);
});

// const menuItem = deliveryStore.menuItems[0];

const props = defineProps({
  menuItem: Object,
  Required: true,
});

const count = ref(1);

const formattedCount = computed(() => {
  return count.value < 10 ? `0${count.value}` : `${count.value}`;
});

function increment() {
  count.value++;
  console.log(count.value);
}

function decrement() {
  count.value--;
  console.log(count.value);
}
</script>

<template>
  <div class="back-button">
    <BackButton></BackButton>
  </div>

  <div class="card">
    <img
      class="menu-item-image"
      alt="dish image"
      :src="deliveryStore.menuItem.img"
    />

    <div class="card-panel">
      <div class="card-title">
        {{ deliveryStore.menuItem.title }}
      </div>

      <div class="card-description">
        {{ deliveryStore.menuItem.description }}
      </div>

      <div class="card-tags">
        <div class="tag" v-for="item in deliveryStore.menuItem.ingredients">
          {{ item }}
        </div>
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

        <button class="counter-include">
          include &#9679; ${{ deliveryStore.menuItem.price }}
        </button>
      </div>
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

.back-button {
  position: absolute;
  top: 128px;
  left: 122px;
}

.card {
  width: calc(100% - 244px);
  margin: 100px auto 155px;
  height: 100%;
  background: #000a0f;
  display: flex;
  //   flex-direction: column;
  align-items: center;
  gap: 48px;
  position: relative;
  color: #e1e1e6;
  text-align: center;

  & button {
    background-color: #00070a;
    border: none;
    color: #e1e1e6;
    cursor: pointer;
  }

  & .menu-item-image {
    max-height: 390px;
    height: 100%;
  }

  &-panel {
    width: 687px;
    height: 300px;
    margin: 45px 0;
    display: flex;
    align-items: start;
    gap: 24px;
    flex-direction: column;

    & .card-tags {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      //   flex-direction: row;
      //   flex-wrap: wrap;

      & .tag {
        // display: flex;
        padding: 4px 8px;
        width: 82px;
        height: 32px;
        gap: 8px;
        border-radius: 5px;
        background: #192227;
      }
    }

    & .counter {
      width: 80%;
      height: 48px;
      margin-top: 24px;
      display: flex;
      gap: 33px;
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
        width: 24px;
        font-size: 20px;
        line-height: 32px;
        font-weight: 700;
      }

      &-include {
        font-size: 14px;
        line-height: 24px;
        background: #750310;
        width: 162px;
        height: 48px;
        padding: 12px 24px;
        border-radius: 5px;
        font-weight: 500;

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

    & .card-title {
      font-size: 40px;
      font-weight: 500;
      line-height: 56px;
      white-space: nowrap;
    }

    & .card-description {
      color: #c4c4cc;
      font-size: 24px;
      font-weight: 400;
      line-height: 33.6px;
      text-align: start;
    }
  }
}

@media screen and (max-width: 1200px) {
  .card {
    width: calc(100% - 112px);
    margin: 80px auto 34px;
    // flex-direction: column;
    gap: 0;

    & .menu-item-image {
      max-height: 300px;
      min-height: 264px;
      margin: 16px 26px 16px;
    }

    &-panel {
      //   width: 100%;
      //   height: fit-content;
      //   margin: 0;
      //   align-items: center;

      & .card-title {
        // font-size: 27.04px;
        // font-weight: 500;
        // line-height: 37.86px;
      }

      & .card-description {
        // font-size: 16.22px;
        // font-weight: 400;
        // line-height: 22.71px;
      }

      & .counter {
        &-include {
          //   width: 60%;
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .card {
    width: calc(100% - 112px);
    margin: 80px auto 34px;
    flex-direction: column;
    gap: 0;

    & .menu-item-image {
      max-height: 300px;
      min-height: 264px;
      margin: 16px 26px 16px;
    }

    &-panel {
      width: 100%;
      height: fit-content;
      margin: 0;
      align-items: center;

      & .card-tags {
        justify-content: center;
      }

      & .card-title {
        font-size: 27.04px;
        font-weight: 500;
        line-height: 37.86px;
      }

      & .card-description {
        font-size: 16.22px;
        font-weight: 400;
        line-height: 22.71px;
        text-align: center;
      }

      & .counter {
        justify-content: center;
        &-include {
          height: 38px;
          padding: 4px 24px;
          width: 50%;
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .card {
    width: calc(100% - 112px);
    margin: 80px auto 34px;
    flex-direction: column;
    gap: 0;

    & .menu-item-image {
      //   max-height: 300px;
      height: 100%;
      max-height: 264px;
      margin: 16px 26px 16px;
    }

    &-panel {
      width: 100%;
      height: fit-content;
      margin: 0;
      align-items: center;

      & .card-title {
        font-size: 27.04px;
        font-weight: 500;
        line-height: 37.86px;
      }

      & .card-description {
        font-size: 16.22px;
        font-weight: 400;
        line-height: 22.71px;
        text-align: center;
      }

      & .counter {
        width: 100%;
        height: 80px;
        gap: 12px;
        flex-direction: column;
        &-include {
          height: 38px;
          width: 100%;
        }
      }
    }
  }
}
</style>
