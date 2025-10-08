press_label = "Test"
icon_name = "test"
title_key = "Test"
desc_key = "Test"

card_block = f"""
            <Pressable
              style={{{{styles.categoryCard}}}}
              onPress={{{{() => handleCategoryPress("{press_label}")}}}}
            >
              <View style={{{{styles.taskHeader}}>
                <View style={{{{styles.taskIconContainer}}>
                  <CustomIcon type="IO" name="{icon_name}" size={{{{24}}}} color="#7c3aed" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={{{{16}}}} color="#6b7280" />
              </View>
              <Text style={{{{styles.categoryTitle}}>
                {{{{t("{title_key}")}}}}
              </Text>
              <Text style={{{{styles.categoryDescription}}>
                {{{{t("{desc_key}")}}}}
              </Text>
            </Pressable> """
print(card_block)
