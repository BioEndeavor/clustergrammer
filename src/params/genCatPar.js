import generate_cat_array from "../cats/generateCatArray";
import { mutateCategoriesState } from "../state/reducers/categoriesSlice";

export default (function gen_cat_par(store) {
  const state = store.getState();
  const cat_data = {};
  cat_data.row = generate_cat_array(state, "row");
  cat_data.col = generate_cat_array(state, "col");
  cat_data.cat_num = {};
  cat_data.cat_num.row = cat_data.row.length;
  cat_data.cat_num.col = cat_data.col.length;
  const cat_room = {};
  cat_room.webgl = 0.0135;
  cat_room.x = cat_room.webgl;
  cat_room.y = cat_room.webgl;
  cat_data.cat_room = cat_room;
  cat_data.showing_color_picker = false;
  store.dispatch(mutateCategoriesState(cat_data));
});
