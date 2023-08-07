import axios from "axios";
import { baseAPIURL } from "./BaseSalaryGuru";

export const getPropertyData = async (setData) => {
  await axios
    .get(baseAPIURL + "/properties")
    .then((val) => {
      setData(val.data["result"]);
    })
    .catch((e) => console.warn(e));
};
export const postPropertyData = async (
  setData,
  title,
  location,
  price,
  size,
  bedrooms,
  buyOrRent
) => {
  await axios
    .post(
      baseAPIURL + "/properties",
      {
        title: title,
        location: location,
        price: price,
        size: size,
        bedrooms: bedrooms,
        buyOrRent: buyOrRent,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((val) => {
      console.log(val);
      // setData(val.data["result"]);
    })
    .catch((e) => console.warn(e));
};
