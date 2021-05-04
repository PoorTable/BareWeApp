import React, { useState } from "react";
import { Platform } from "react-native";

var IsIOS = false;

export function DeterminatePlatform() {
	Platform.OS.toLowerCase() === "ios" ? (IsIOS = true) : (IsIOS = false);
	console.log(IsIOS);
}

export function IsPlatformIOS() {
	return IsIOS;
}
