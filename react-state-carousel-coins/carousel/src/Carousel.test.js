import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("renders without crashing", function() {
  render(<Carousel 
    photos={TEST_IMAGES}/>);
});

it("matches snapshot", function() {
  const {asFragment} = render(<Carousel 
    photos={TEST_IMAGES}/>);
  expect(asFragment()).toMatchSnapshot();
});

it("left arrow is not visible on the first image and becomes visible after going forward", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).not.toBeInTheDocument();

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow); // Move to the second image

  expect(container.querySelector(".bi-arrow-left-circle")).toBeInTheDocument();
});

it("right arrow is not visible on the last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // Click the right arrow until the end of the images array
  for (let i = 0; i < TEST_IMAGES.length - 1; i++) {
    fireEvent.click(rightArrow);
  }

  expect(rightArrow).not.toBeInTheDocument();
});

it("going backward from the second image shows the first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow); // Move to the second image

  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow); // Move back to the first image

  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
  expect(leftArrow).not.toBeInTheDocument(); // Left arrow should not be visible on the first image
});

