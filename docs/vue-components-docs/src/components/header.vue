<template>
  <div class="headerWrapper">
    <header
      ref="header"
      class="header"
    >
      <div class="container">
        <h1><router-link :to="`/`">
          <!-- logo -->
          <!--          <slot>-->
          <!--            <img-->
          <!--              style="width: 180px;height: 56px"-->
          <!--              :src="logoImgUrl"-->
          <!--              alt="element-logo"-->
          <!--              class="nav-logo"-->
          <!--            >-->
          <!--          </slot>-->

        </router-link></h1>
        <!-- nav -->
        <ul class="nav">
          <!--          <li class="nav-item nav-algolia-search" v-show="isComponentPage">-->
          <!--            <algolia-search></algolia-search>-->
          <!--          </li>-->
          <!--          <li class="nav-item">-->
          <!--            <router-link-->
          <!--                active-class="active"-->
          <!--                :to="`/guide`">{{ langConfig.guide }}-->
          <!--            </router-link>-->
          <!--          </li>-->
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/component`"
            >{{ `组件` }}
            </router-link>
          </li>
          <li
            class="nav-item"
          >
            <router-link
              active-class="active"
              :to="`/utils`"
            >{{ `公共方法` }}
            </router-link>
          </li>
          <!--          <li class="nav-item">-->
          <!--            <router-link-->
          <!--                active-class="active"-->
          <!--                :to="`/${ lang }/resource`"-->
          <!--                exact>{{ langConfig.resource }}-->
          <!--            </router-link>-->
          <!--          </li>-->

          <!-- gap -->
          <!--          <li class="nav-item" v-show="isComponentPage">-->
          <!--            <div class="nav-gap"></div>-->
          <!--          </li>-->

          <!-- 版本选择器 -->
          <!--          <li class="nav-item nav-versions" v-show="isComponentPage">-->
          <!--            <el-dropdown-->
          <!--                trigger="click"-->
          <!--                class="nav-dropdown"-->
          <!--                :class="{ 'is-active': verDropdownVisible }">-->
          <!--              <span>-->
          <!--                {{ version }}-->
          <!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--              </span>-->
          <!--              <el-dropdown-menu-->
          <!--                  slot="dropdown"-->
          <!--                  class="nav-dropdown-list"-->
          <!--                  @input="handleVerDropdownToggle">-->
          <!--                <el-dropdown-item-->
          <!--                    v-for="item in Object.keys(versions)"-->
          <!--                    :key="item"-->
          <!--                    @click.native="switchVersion(item)">-->
          <!--                  {{ item }}-->
          <!--                </el-dropdown-item>-->
          <!--              </el-dropdown-menu>-->
          <!--            </el-dropdown>-->
          <!--          </li>-->
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
import logoImg from "../asset/images/logo.png"
export default {
  components: {},
  data() {
    return {
      logoImgUrl: logoImg
    };
  },

  computed: {},
  mounted() {},

  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.headerWrapper {
  height: 80px;
}

#v3-banner {
  z-index: 19;
  box-sizing: border-box;
  min-height: 30px;
  padding: 5px 60px;
  color: #eee;
  text-align: center;
  background-color: #409EFF;
}

#v3-banner a {
  color: #FFF;
  font-weight: bold;
}

.header {
  position: relative;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 80px;
  color: #fff;
  line-height: 80px;
  background-color: #fff;

  .container {
    box-sizing: border-box;
    height: 100%;
    border-bottom: 1px solid #DCDFE6;
  }

  .nav-lang-spe {
    color: #888;
  }

  h1 {
    float: left;
    margin: 0;
    font-weight: normal;
    font-size: 32px;

    a {
      display: block;
      color: #333;
      text-decoration: none;
    }

    span {
      display: inline-block;
      width: 34px;
      height: 18px;
      margin-left: 10px;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      vertical-align: middle;
      border: 1px solid rgba(255, 255, 255, .5);
      border-radius: 3px;
    }
  }

  .nav {
    float: right;
    height: 100%;
    margin: 0;
    padding: 0;
    line-height: 80px;
    background: transparent;
    &::before, &::after {
      display: table;
      content: "";
    }
    &::after {
      clear: both;
    }
  }

  .nav-gap {
    position: relative;
    width: 1px;
    height: 80px;
    padding: 0 20px;

    &::before {
      position: absolute;
      top: calc(50% - 8px);
      width: 1px;
      height: 16px;
      background: #ebebeb;
      content: '';
    }
  }

  .nav-logo,
  .nav-logo-small {
    vertical-align: middle;
  }

  .nav-logo-small {
    display: none;
  }

  .nav-item {
    position: relative;
    float: left;
    margin: 0;
    list-style: none;
    cursor: pointer;

    &.nav-algolia-search {
      cursor: default;
    }

    &.lang-item,
    &:last-child {
      margin-left: 34px;
      cursor: default;

      span {
        opacity: .8;
      }

      .nav-lang {
        display: inline-block;
        height: 100%;
        color: #888;
        cursor: pointer;

        &:hover {
          color: #409EFF;
        }
        &.active {
          color: #409EFF;
          font-weight: bold;
        }
      }
    }

    a {
      display: block;
      padding: 0 22px;
      color: #1989FA;
      text-decoration: none;
      opacity: 0.5;

      &.active,
      &:hover {
        opacity: 1;
      }

      &.active::after {
        position: absolute;
        bottom: 0;
        left: calc(50% - 15px);
        display: inline-block;
        width: 30px;
        height: 2px;
        background: #409EFF;
        content: '';
      }
    }
  }
}

.nav-dropdown {
  width: 100%;
  margin-bottom: 6px;
  padding-left: 18px;

  span {
    display: block;
    width: 100%;
    padding-bottom: 6px;
    color: #888;
    font-size: 16px;
    line-height: 40px;
    transition: .2s;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    color: #979797;
    font-size: 12px;
    transform: translateY(-2px);
    transition: .2s;
  }

  .is-active {
    span, i {
      color: #409EFF;
    }
    i {
      transform: rotateZ(180deg) translateY(3px);
    }
  }

  &:hover {
    span, i {
      color: #409EFF;
    }
  }
}

.nav-dropdown-list {
  width: auto;
}

@media (max-width: 850px) {
  .header {
    .nav-logo {
      display: none;
    }
    .nav-logo-small {
      display: inline-block;
    }
    .nav-item {
      margin-left: 6px;

      &.lang-item,
      &:last-child {
        margin-left: 10px;
      }

      a {
        padding: 0 5px;
      }
    }
    .nav-theme-switch, .nav-algolia-search {
      display: none;
    }
  }
}

@media (max-width: 700px) {
  .header {
    .container {
      padding: 0 12px;
    }
    .nav-item {
      a {
        font-size: 12px;
        vertical-align: top;
      }

      &.lang-item {
        height: 100%;

        .nav-lang {
          display: flex;
          align-items: center;

          span {
            padding-bottom: 0;
          }
        }
      }
    }
    .nav-dropdown {
      padding: 0;
      span {
        font-size: 12px;
      }
    }
    .nav-gap {
      padding: 0 8px;
    }
    .nav-versions {
      display: none;
    }
  }
}
</style>

