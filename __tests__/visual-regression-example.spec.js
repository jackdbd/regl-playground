import { toMatchImageSnapshot } from "jest-image-snapshot";
import { Chrome } from "navalia";

expect.extend({ toMatchImageSnapshot });

describe("Visual Regressions", () => {
  let chrome = null;

  beforeEach(() => {
    chrome = new Chrome({
      // we can specify a timeout in milliseconds, but it doesn't prevent
      // jasmine.DEFAULT_TIMEOUT_INTERVAL for skipping the test with this url:
      // url = 'http://regl.party/'
      timemout: 30000,
      flags: {
        // go headless, otherwise jasmine timeout is exceeded
        headless: true,
      },
    });
  });

  afterEach(() => {
    chrome.done();
  });

  it("should NEVER happen", () => {
    // regl.party takes too long to load and exceeds the timeout specified by
    // jasmine.DEFAULT_TIMEOUT_INTERVAL.
    // const url = 'http://regl.party/';
    const url = "http://learningwebgl.com/lessons/lesson01/index.html";
    // we can spin up a dev server with yarn run dev and test locally
    // const url = 'http://localhost:8080/one-shot-rendering.html'
    return chrome
      .goto(url)
      .then(() => chrome.screenshot())
      .then((image) => expect(image).toMatchImageSnapshot());
  });
});
