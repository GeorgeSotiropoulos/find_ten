<Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  {/* Modal content */}
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0)",
      margin: 50,
      borderRadius: 10,
      padding: 20,
    }}
  >
    {/* Confirmation message */}
    <Text style={styles.text}>Game ongoing.</Text>
    <Text style={styles.text}>Are you sure?</Text>
    <Text style={styles.text}> </Text>

    {/* Buttons for Yes and No */}
    <View style={{ flexDirection: "row" }}>
      <LinearGradient
        colors={ButtonShades} //"#F0F0FC"
        style={sharedStyles.buttonStyle}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text style={sharedStyles.buttonText}>No</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={ButtonShades} //"#F0F0FC"
        style={sharedStyles.buttonStyle}
      >
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            setModalVisible(false);
            // Navigate to the home screen
            navigation.navigate("SettingsScreen");
          }}
        >
          <Text style={sharedStyles.buttonText}>Yes</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  </View>
</Modal>;
