import {
  EnvironmentOutlined,
  HistoryOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Input, List } from "antd";
import cn from "classnames";
import { store } from "context/redux";
import {
  handleAddress,
  handleHistory,
  handleSelect,
} from "context/redux/action";
import React, { useEffect, useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { connect } from "react-redux";
import styles from "./Input.module.scss";

const InputMap = () => {
  const { address, coordinates, history } = store.getState();
  const [showSuggestion, setshowSuggestion] = useState<boolean>(false);
  const [addressTemp, setaddressTemp] = useState<string>("");

  useEffect(() => {
    handleAddress(addressTemp);
  }, [addressTemp]);

  useEffect(() => {
    if (address !== "") {
      setshowSuggestion(true);
    }
  }, [address]);

  useEffect(() => {
    setshowSuggestion(false);
  }, [coordinates]);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setaddressTemp}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        let places: object[] = [...history, ...suggestions];
        return (
          <div>
            <div className={styles["input"]}>
              <Input
                {...getInputProps({
                  placeholder: "Where'd you wanna go?",
                  onFocus: () => setshowSuggestion(true),
                  onBlur: () => setshowSuggestion(false),
                })}
              />
            </div>
            <div>
              {loading ? <LoadingOutlined /> : null}
              {showSuggestion ? (
                <div className={styles["list-wrapper"]}>
                  <List
                    size="large"
                    itemLayout="horizontal"
                    dataSource={places}
                    renderItem={(item: any) => {
                      return (
                        <List.Item
                          {...getSuggestionItemProps(item, {
                            onClick: () => handleHistory(history, item),
                          })}
                          className={cn({ [styles.active]: item.active })}
                        >
                          <List.Item.Meta
                            title={
                              <div className={styles.suggestion}>
                                {history.find(
                                  (elem) =>
                                    JSON.stringify(elem) ===
                                    JSON.stringify(item)
                                ) !== undefined ? (
                                  <HistoryOutlined />
                                ) : (
                                  <EnvironmentOutlined />
                                )}

                                {item.formattedSuggestion.mainText}
                              </div>
                            }
                            description={item.description}
                          />
                        </List.Item>
                      );
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};

const mapStateToProps = (state: any) => {
  return {
    coordinates: state.coordinates,
    address: state.address,
    history: state.history,
  };
};

export default connect(mapStateToProps)(InputMap);
