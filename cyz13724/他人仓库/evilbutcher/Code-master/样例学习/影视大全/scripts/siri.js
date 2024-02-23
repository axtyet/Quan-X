const utils = require("./utils");

exports.init = () => {
  const image = $image("/assets/icon.png");
  $ui.render({
    views: [{
      type: "gradient",
      props: {
        colors: [$color("#8F94FB"), $color("#4E54CB")],
        locations: [0.0, 1.0],
        startPoint: $point(0, 0),
        endPoint: $point(1, 1),
        cornerRadius: 40,
        smoothCorners: true
      },
      layout: (make, view) => {
        make.size.equalTo($size(200, 200));
        make.centerX.equalTo(view.super);
        make.centerY.equalTo(view.super).offset(-30)
      },
      views: [{
        type: "image",
        props: {
          tintColor: $color("white"),
          image: image.alwaysTemplate
        },
        layout: (make, view) => {
          make.size.equalTo($size(160, 160));
          make.center.equalTo(view.super);
          utils.shadows(view, {
            color: utils.systemColor("indigo"),
            cornerRadius: 0,
            radius: 10,
            opacity: 0.36,
            offset: $size(0, 0)
          });
        }
      }]
    },
    {
      type: "label",
      props: {
        text: $addin.current.name,
        font: $font(25),
        textColor: $color("systemLabel")
      },
      layout: (make, view) => {
        make.centerX.equalTo(view.super);
        make.top.equalTo(view.super.centerY).offset(100);
        utils.shadows(view, {
          color: $color("black"),
          cornerRadius: 0,
          radius: 2,
          opacity: 0.33,
          offset: $size(1, 1)
        });
      }
    }]
  });
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
