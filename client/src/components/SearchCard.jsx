/* eslint-disable react/prop-types */
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchCard = ({ setSearchCity, loading }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchCity(city);
  };
  return (
    <Card className="">
      <CardBody>
        <h1 className="text-3xl font-bold mb-4 text-white text-center">
          Weather Dashboard
        </h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            clearable
            bordered
            fullWidth
            size="lg"
            placeholder="Enter city name"
            contentLeft={<Search />}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            isDisabled={loading}
          />
          <Button
            auto
            color="warning"
            size="lg"
            type="submit"
            isLoading={loading}
          >
            Search
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default SearchCard;
