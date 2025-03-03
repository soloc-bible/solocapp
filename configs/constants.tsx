import { IsIPAD } from "@/themes/app.constant";
import { Dimensions, Image } from "react-native";
import {scale, verticalScale } from "react-native-size-matters";
// @ts-ignore
import One from "@/assets/images/1.png";
// @ts-ignore
import Two from "@/assets/images/2.png";
// @ts-ignore
import Three from "@/assets/images/3.png";


export const onBoardingSlides: onBoardingSlidesTypes[] = [
    {
      color: "#E8E8E4", // background color
      title: "Explore",
      image: (
        <Image
          source={One}
          resizeMode="contain"
          style={{
            width: IsIPAD ? verticalScale(285) : verticalScale(320),
            height: IsIPAD ? verticalScale(345) : verticalScale(330),
          }}
        />
      ),
      secondTitle: "Our Community",
      subTitle:
        "Find the perfect course to enhance your career prospects and skill set",
    },
    {
      color: "#F8EDEB",
      title: "Set Your",
      image: (
        <Image
          source={Two}
          resizeMode="contain"
          style={{
            width: IsIPAD ? scale(285) : scale(320),
            height: IsIPAD ? verticalScale(345) : verticalScale(330),
          }}
        />
      ),
      secondTitle: "Own Goal",
      subTitle:
        "Personalize your study plan with flexible timelines that suit you best",
    },
    {
      color: "#9b9b7a",
      image: (
        <Image
          source={Three}
          resizeMode="contain"

          style={{
            width: IsIPAD ? scale(285) : scale(320),
            height: IsIPAD ? verticalScale(345) : verticalScale(330),
          }}
        />
      ),
      title: "Complete full",
      secondTitle: "Course",
      subTitle:
        "Achieve certification by completing courses with dedicated effort",
    },
  ];

// onboarding variables
export enum Side  {
    LEFT,
    RIGHT,
    NONE
}
export const MIN_LEDGE = 25; 
export const {width: WIDTH, height: HEIGHT} = Dimensions.get("screen");
export const MARGIN_WIDTH = MIN_LEDGE + 50; // active area for sliding
export const PREV = WIDTH;
export const NEXT = 0;
export const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH]
