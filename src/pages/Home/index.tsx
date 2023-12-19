import React, { useState, useTransition } from "react";
import { Spin, Input } from "antd";

function Home() {
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    startTransition(() => {
      setSearchQuery(inputValue);
    });
  };

  return (
    <div>
      <Input onChange={handleChange} value={value} />
      <Spin tip="Loading..." spinning={isPending}>
        <p>{searchQuery}</p>
      </Spin>
    </div>
  );
}
export default Home;
