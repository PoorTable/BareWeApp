import React, { useState } from "react";
import { Platform } from "react-native";

const IsIOS = false;

export function DeterminatePlatform() {
	Platform.OS.toLowerCase = "ios" ? (IsIOS = true) : (IsIOS = false);
}

export function IsPlatformIOS() {
	return isIOS;
}
