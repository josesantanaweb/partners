import React, { Component } from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";

const items = [
  {
    src: "https://partnersadvisers.cl/wp-content/uploads/2021/07/Partners_banner_5.jpg",
    altText: "01",
    caption: "Trabajamos con las mejores instituciones y compañías, pero lo mejor es Nuestra Objetividad.",
  },
  {
    src: "https://partnersadvisers.cl/wp-content/uploads/2021/07/Partners_banner_6.jpg",
    altText: "Slide 2",
    caption: "Trabajamos con las mejores instituciones y compañías, pero lo mejor es Nuestra Objetividad.",
  },
  {
    src: "https://partnersadvisers.cl/wp-content/uploads/2021/07/Partners_banner_7.jpg",
    altText: "Slide 3",
    caption: "Trabajamos con las mejores instituciones y compañías, pero lo mejor es Nuestra Objetividad.",
  },
];

class Carrousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
          <img
            src={item.src}
            alt={item.altText}
            style={{
              height: "65vh",
              width: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: "white",
            }}
          />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

export default Carrousel;
