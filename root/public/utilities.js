"use strict";

// Returns a promise that is resolved after a given amount of tme in seconds
export const gsapDelayedPromise = (secs_) => {
  return new Promise((res_) => {
    gsap.delayedCall(secs_, () => {
      res_();
    });
  });
};

// Returns a random number between (and including) the values provided
export const getRandomNumber = (min_, max_) => {
  return Math.floor(Math.random() * (max_ - min_ + 1) + min_);
};
