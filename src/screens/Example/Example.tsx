import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import i18next from "i18next";
import { useQuery } from "@tanstack/react-query";

import { ImageVariant } from "@/components/atoms";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { fetchOne } from "@/services/users";

import { isImageSourcePropType } from "@/types/guards/image";

import SendImage from "@/theme/assets/images/send.png";
import ColorsWatchImage from "@/theme/assets/images/colorswatch.png";
import TranslateImage from "@/theme/assets/images/translate.png";
import {
  getAllDeployedCollections,
  useGetAllCollections,
} from "@/services/launchpad/collection";

function Example() {
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const pagination = { page: 1, limit: 20 };

  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ["example", currentId],
    queryFn: () => {
      return fetchOne(currentId);
    },
    enabled: currentId >= 0,
  });

  useEffect(() => {
    if (isSuccess) {
      Alert.alert("welcome to vesta");
    }
  }, [isSuccess, data]);

  const onChangeTheme = () => {
    changeTheme(variant === "default" ? "dark" : "default");
  };

  const onChangeLanguage = (lang: "fr" | "en") => {
    void i18next.changeLanguage(lang);
  };

  if (
    !isImageSourcePropType(SendImage) ||
    !isImageSourcePropType(ColorsWatchImage) ||
    !isImageSourcePropType(TranslateImage)
  ) {
    throw new Error("Image source is not valid");
  }

  const {
    data: allCollections,
    isLoading: isLoadingAllCollections,
    isError: isErrorAllCollections,
  } = useGetAllCollections(pagination);

  const {
    data: allDeployedCollections,
    isLoading: isLoadingAllDeployedCollections,
    isError: isErrorAllDeployedCollections,
  } = getAllDeployedCollections(pagination);

  useEffect(() => {
    console.log("All Collections: ", allCollections);
    console.log("Is Loading Collections: ", isLoadingAllCollections);
    console.log("Is Error Collections: ", isErrorAllCollections);

    if (isErrorAllCollections) {
      console.error("Error loading collections");
    }
  }, [allCollections, isLoadingAllCollections, isErrorAllCollections]);

  useEffect(() => {
    console.log("All Collections: ", allCollections);
    console.log("All Deployed Collections: ", allDeployedCollections);
  }, [allCollections, allDeployedCollections]);

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={[
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
        ]}
      >
        <View
          style={[
            layout.flex_1,
            layout.relative,
            layout.fullWidth,
            layout.justifyCenter,
            layout.itemsCenter,
          ]}
        >
          <View
            style={[layout.absolute, backgrounds.gray100, components.circle250]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <Brand height={300} width={300} />
          </View>
        </View>

        <View
          style={[
            layout.flex_1,
            layout.justifyBetween,
            layout.itemsStart,
            layout.fullWidth,
            gutters.paddingHorizontal_32,
            gutters.marginTop_40,
          ]}
        >
          <View>
            <Text style={[fonts.gray400, fonts.bold, fonts.size_24]}>
              Testing Test
            </Text>
          </View>
          <View>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              {"Vesta"}
            </Text>
            <Text
              style={[
                fonts.gray400,
                fonts.bold,
                fonts.size_24,
                gutters.marginBottom_32,
              ]}
            >
              {"Vesta App"}
            </Text>
            <Text style={[fonts.size_16, fonts.gray200]}>
              {"Vesta Property Exchange"}
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <TouchableOpacity
              testID="fetch-user-button"
              style={[components.buttonCircle, gutters.marginBottom_16]}
              onPress={() => setCurrentId(Math.ceil(Math.random() * 10 + 1))}
            >
              {isFetching ? (
                <ActivityIndicator />
              ) : (
                <ImageVariant
                  source={SendImage}
                  style={{ tintColor: colors.purple500 }}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              testID="change-theme-button"
              style={[components.buttonCircle, gutters.marginBottom_16]}
              onPress={() => onChangeTheme()}
            >
              <ImageVariant
                source={ColorsWatchImage}
                style={{ tintColor: colors.purple500 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
