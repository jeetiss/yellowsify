import React from "react";
import styled from "styled-components";
import { Value, Compose } from "react-powerplug/dist/react-powerplug.umd";
import face from "../face.svg";

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Relative = styled.div`
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  opacity: 0.9;
  background-color: #f3da43;

  mask-image: url(${face});
  mask-size: var(--size);
  mask-position: center var(--margin);
`;

const createHandler = setter => e => setter(e.target.value);

const readURL = set => e => {
  if (e.target.files && e.target.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      set(e.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  }
};

const App = () => (
  <Value>
    {({ value: image, set }) =>
      image ? (
        <Compose components={[<Value initial={225} />, <Value initial={85} />]}>
          {(size, margin) => (
            <Centered>
              <Relative>
                <img src={image} alt="" />

                <Absolute
                  style={{
                    "--size": size.value + "%",
                    "--margin": margin.value + "%"
                  }}
                />
              </Relative>

              <label htmlFor="size">Size</label>
              <input
                type="range"
                name="size"
                min="80"
                max="290"
                onChange={createHandler(size.set)}
                value={size.value}
              />

              <label htmlFor="top">Margin</label>
              <input
                type="range"
                name="top"
                min="50"
                max="150"
                onChange={createHandler(margin.set)}
                value={margin.value}
              />
            </Centered>
          )}
        </Compose>
      ) : (
        <Centered>
          <input type="file" onChange={readURL(set)} />
        </Centered>
      )
    }
  </Value>
);

export default App;
