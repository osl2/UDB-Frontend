import User from '@/dataModel/User';
import Vue from 'vue';
import UserGroup from "@/dataModel/UserGroup";

export let userState = new Vue(
  {
    data: {
      user: new User('', '', '', '', UserGroup.Unauthenticated),
    },
  },
);
