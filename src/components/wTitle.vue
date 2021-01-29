<template>
  <div class="w-title">
    <p class="title">{{data.title}}</p>
    <div class="meta flex-box">
      <div>
        <span class="author">{{data.author}}</span>
        <span class="time">{{created}}</span>
      </div>
      <span class="count">阅读 {{data.readCount}}</span>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  name: 'wTitle',
  props: {
    data: {
      type: Object,
    }
  },
  data () {
    return {
    }
  },
  computed: {
    created() {
      return DateTime.fromISO(this.data.CreatedAt).toRelativeCalendar();
    }
  }
}
</script>

<style lang='less'>
.w-title{
  .title{
    font-size: 25px;
    font-weight: 500;
  }
  .meta{
    font-size: 14px;
    margin: 12px 0;
    color: #999;
    .author{
      margin-right: 6px;
      color: #576b95;
    }
  }
}
</style>