export interface Country {
	name: Name
	capital: string
	flag: string
}

export interface Name {
	common: string
	official: string
	nativeName: { [key: string]: NativeName }
}

export interface NativeName {
	official: string
	common: string
}

export interface QuestionValues {
	name: string
	capital: string
	flag: string
	wrongAnswers: string[]
}
