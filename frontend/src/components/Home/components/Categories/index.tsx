import React, { useState } from "react";
import useCategories from "@components/Home/components/Categories/hooks/useCategories";
import { ICategoryProps } from "@components/Home/components/Categories/categories.types";
import Checkbox from "@shared/Checkbox";

const Categories: React.FC = () => {
  const [selectAllCategorise, setSelectAllCategories] = useState(false);

  const { categoriesList, toogleCategory } = useCategories();

  const handleSelectAllCategories = () => {
    setSelectAllCategories(!selectAllCategorise);
    categoriesList?.forEach((el) => {
      toogleCategory(el.id);
      el.childCategories?.length &&
        el.childCategories?.forEach((child) => toogleCategory(el.id, child.id));
    });
  };
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Категории</h2>
      <div className="mb-8 bg-[#2D2D2D] p-7 font-inter text-[#C1D9E2]">
        <div>
          <Checkbox
            isChecked={selectAllCategorise}
            onChange={handleSelectAllCategories}
            labelTxt={"Все категории"}
          />
          {categoriesList?.map((item) => (
            <div key={item.id} className="mt-10 mb-9">
              {/*<h3  className="mb-6 text-xl font-normal">{`${item.name}`}</h3>*/}
              <p className={"text-txt_secondary mb-2"}>
                {item.name}
                <span>
                  {item.childCategories?.length &&
                    `(${item.childCategories.length})`}
                </span>
              </p>
              {/*<Checkbox className={``} isChecked={item.isChecked} onChange={()=>toogleCategory(item.id)} key={item.id} labelTxt={item.name} />*/}
              {item.childCategories &&
                item.childCategories.map((child, index) => (
                  <Checkbox
                    isChecked={child.isChecked}
                    onChange={() => toogleCategory(item.id, child.id)}
                    key={index}
                    labelTxt={child.name}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
