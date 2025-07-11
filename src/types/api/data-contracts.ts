/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @format int32 */
export enum WorkflowStepAction {
  IdentitySdk = 0,
  RiskScoring = 1,
  Questionaries = 2,
  InvestorCategorization = 3,
  AppropriatenessTest = 4,
  UploadDocument = 5,
}

/** @format int32 */
export enum UserSystemStatusType {
  Admin = 0,
  KYC = 1,
  HighRisk = 2,
  Funds = 3,
}

/** @format int32 */
export enum UserStatus {
  Disabled = 0,
  Activated = 10,
  WithdrawOnly = 20,
  UnderReview = 30,
}

/** @format int32 */
export enum UserRiskLevel {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Severe = 4,
}

/** @format int32 */
export enum UserNotificationState {
  Unread = 0,
  Read = 1,
}

/** @format int32 */
export enum UserKYCStatus {
  Unknown = 0,
  InProgress = 10,
  UnderReview = 20,
  Verified = 30,
  Rejected = 40,
}

/** @format int32 */
export enum UserExchangeTransactionType {
  PlaceBuyOrder = 0,
  PlaceSellOrder = 1,
  PlaceCancelOrder = 2,
}

/** @format int32 */
export enum UserExchangeTransactionStatus {
  Sending = 0,
  SentToExchange = 1,
  SendingError = 2,
}

/** @format int32 */
export enum TypeAttributes {
  NotPublic = 0,
  AutoLayout = 1,
  AnsiClass = 2,
  Class = 3,
  Public = 4,
  NestedPublic = 5,
  NestedPrivate = 6,
  NestedFamily = 7,
  NestedAssembly = 8,
  NestedFamANDAssem = 16,
  VisibilityMask = 24,
  NestedFamORAssem = 32,
  SequentialLayout = 128,
  ExplicitLayout = 256,
  LayoutMask = 1024,
  Interface = 2048,
  ClassSemanticsMask = 4096,
  Abstract = 8192,
  Sealed = 16384,
  SpecialName = 65536,
  RTSpecialName = 131072,
  Import = 196608,
  Serializable = 262144,
  WindowsRuntime = 264192,
  UnicodeClass = 1048576,
  AutoClass = 12582912,
  StringFormatMask = "StringFormatMask",
  CustomFormatClass = "CustomFormatClass",
  HasSecurity = "HasSecurity",
  ReservedMask = "ReservedMask",
  BeforeFieldInit = "BeforeFieldInit",
  CustomFormatMask = "CustomFormatMask",
}

/** @format int32 */
export enum TopupTransferStatus {
  Pending = 0,
  Failed = 1,
  Success = 2,
}

/** @format int32 */
export enum TopupMethod {
  AdminAccess = 0,
  BankTransfer = 1,
  PaymentGateway = 2,
}

/** @format int32 */
export enum TenantAvailabilityState {
  Available = 1,
  InActive = 2,
  NotFound = 3,
}

/** @format int32 */
export enum SystemUser {
  Ordinary = 0,
  TKB = 1,
}

/** @format int32 */
export enum SubscriptionStartType {
  Free = 1,
  Trial = 2,
  Paid = 3,
}

/** @format int32 */
export enum SubscriptionPaymentType {
  Manual = 0,
  RecurringAutomatic = 1,
  RecurringManual = 2,
}

/** @format int32 */
export enum SubscriptionPaymentStatus {
  NotPaid = 1,
  Paid = 2,
  Failed = 3,
  Cancelled = 4,
  Completed = 5,
}

/** @format int32 */
export enum SubscriptionPaymentGatewayType {
  Paypal = 1,
  Stripe = 2,
}

/** @format int32 */
export enum SettingScopes {
  Application = 1,
  Tenant = 2,
  User = 4,
  All = 7,
}

/** @format int32 */
export enum SecurityRuleSet {
  None = 0,
  Level1 = 1,
  Level2 = 2,
}

/** @format int32 */
export enum SalesSummaryDatePeriod {
  Daily = 1,
  Weekly = 2,
  Monthly = 3,
}

/** @format int32 */
export enum RiskLevel {
  LowRisk = 0,
  MediumRisk = 1,
  HighRisk = 2,
  Alert = 3,
}

/** @format int32 */
export enum ReviewStatus {
  Approved = 0,
  Reject = 1,
  UnderReview = 2,
}

/** @format int32 */
export enum PropertyAttributes {
  None = 0,
  SpecialName = 512,
  RTSpecialName = 1024,
  HasDefault = 4096,
  Reserved2 = 8192,
  Reserved3 = 16384,
  Reserved4 = 32768,
  ReservedMask = 62464,
}

/** @format int32 */
export enum PaymentStatus {
  Pending = 0,
  Canceled = 1,
  Completed = 2,
  Refund = 3,
}

/** @format int32 */
export enum PaymentPeriodType {
  Monthly = 30,
  Annual = 365,
}

/** @format int32 */
export enum ParameterType {
  WatchList = 0,
  Kyc = 1,
}

/** @format int32 */
export enum ParameterAttributes {
  None = 0,
  In = 1,
  Out = 2,
  Lcid = 4,
  Retval = 8,
  Optional = 16,
  HasDefault = 4096,
  HasFieldMarshal = 8192,
  Reserved3 = 16384,
  Reserved4 = 32768,
  ReservedMask = 61440,
}

/** @format int32 */
export enum OrderType {
  LIMIT = 0,
  MARKET = 1,
}

/** @format int32 */
export enum OrderExpireOption {
  OneDay = 24,
  ThreeDays = 72,
  SevenDays = 168,
  FourteenDays = 336,
  OneMonth = 672,
}

/** @format int32 */
export enum OrderEventType {
  OrderEventTypeCreate = 1,
  OrderEventTypeReplace = 2,
  OrderEventTypeFill = 3,
  OrderEventTypeClose = 4,
  OrderEventTypeCancel = 5,
  OrderEventTypeExpire = 6,
  OrderEventTypeAlarm = 7,
  OrderEventTypeQueue = 8,
  OrderEventTypeDequeue = 9,
  OrderEventTypeOrderbookEnter = 10,
  OrderEventTypeOrderbookExit = 11,
}

/** @format int32 */
export enum OrderActivityStatus {
  Unknown = 5,
  Active = 10,
  Complete = 15,
  Cancelled = 20,
  Expired = 25,
}

/** @format int32 */
export enum OperationStatus {
  PlacingByBroker = 5,
  PlacedByBroker = 10,
  PlacingError = 15,
  PlacedByExchange = 20,
  Canceled = 25,
  PartiallyFilledAndCanceled = 30,
  Filled = 35,
  Expired = 40,
  PartiallyFilledAndExpired = 45,
  PartiallyFilled = 50,
}

/** @format int32 */
export enum NotificationSeverity {
  Info = 0,
  Success = 1,
  Warn = 2,
  Error = 3,
  Fatal = 4,
}

/** @format int32 */
export enum NewsAccessibility {
  Global = 0,
  ShowOnPair = 1,
}

/** @format int32 */
export enum MethodImplAttributes {
  IL = 0,
  Managed = 1,
  Native = 2,
  OPTIL = 3,
  CodeTypeMask = 4,
  Runtime = 8,
  ManagedMask = 16,
  Unmanaged = 32,
  NoInlining = 64,
  ForwardRef = 128,
  Synchronized = 256,
  NoOptimization = 512,
  PreserveSig = 4096,
  AggressiveInlining = 65535,
  AggressiveOptimization = "AggressiveOptimization",
  InternalCall = "InternalCall",
  MaxMethodImplVal = "MaxMethodImplVal",
}

/** @format int32 */
export enum MethodAttributes {
  PrivateScope = 0,
  ReuseSlot = 1,
  Private = 2,
  FamANDAssem = 3,
  Assembly = 4,
  Family = 5,
  FamORAssem = 6,
  Public = 7,
  MemberAccessMask = 8,
  UnmanagedExport = 16,
  Static = 32,
  Final = 64,
  Virtual = 128,
  HideBySig = 256,
  NewSlot = 512,
  VtableLayoutMask = 1024,
  CheckAccessOnOverride = 2048,
  Abstract = 4096,
  SpecialName = 8192,
  RTSpecialName = 16384,
  PinvokeImpl = 32768,
  HasSecurity = 53248,
  RequireSecObject = "RequireSecObject",
  ReservedMask = "ReservedMask",
}

/** @format int32 */
export enum MemberTypes {
  Constructor = 1,
  Event = 2,
  Field = 4,
  Method = 8,
  Property = 16,
  TypeInfo = 32,
  Custom = 64,
  NestedType = 128,
  All = 191,
}

/** @format int32 */
export enum LayoutKind {
  Sequential = 0,
  Explicit = 2,
  Auto = 3,
}

/** @format int32 */
export enum KycType {
  SDD = 0,
  CDD = 1,
  EDD = 2,
}

/** @format int32 */
export enum KycProccessStatus {
  None = 0,
  ProviderResultPending = 1,
  ProviderResultReceived = 2,
  Canceled = 3,
}

/** @format int32 */
export enum InvestorType {
  Individual = 0,
  Sophisticated = 1,
  HighNetWorth = 2,
}

/** @format int32 */
export enum InvestingExperience {
  Limited = 0,
  Good = 1,
  Extensive = 2,
  None = 3,
}

/** @format int32 */
export enum IncomeType {
  Between150Kand200K = 0,
  Between200Kand250K = 1,
  GratherThan250K = 2,
}

/** @format int32 */
export enum IdentityVerificationProvider {
  Onfido = 0,
  SignD = 1,
  Sumsub = 2,
}

/** @format int32 */
export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,
  MultipleChoices = 300,
  Ambiguous = 301,
  MovedPermanently = 302,
  Moved = 303,
  Found = 304,
  Redirect = 305,
  SeeOther = 306,
  RedirectMethod = 307,
  NotModified = 308,
  UseProxy = 400,
  Unused = 401,
  TemporaryRedirect = 402,
  RedirectKeepVerb = 403,
  PermanentRedirect = 404,
  BadRequest = 405,
  Unauthorized = 406,
  PaymentRequired = 407,
  Forbidden = 408,
  NotFound = 409,
  MethodNotAllowed = 410,
  NotAcceptable = 411,
  ProxyAuthenticationRequired = 412,
  RequestTimeout = 413,
  Conflict = 414,
  Gone = 415,
  LengthRequired = 416,
  PreconditionFailed = 417,
  RequestEntityTooLarge = 421,
  RequestUriTooLong = 422,
  UnsupportedMediaType = 423,
  RequestedRangeNotSatisfiable = 424,
  ExpectationFailed = 426,
  MisdirectedRequest = 428,
  UnprocessableEntity = 429,
  UnprocessableContent = 431,
  Locked = 451,
  FailedDependency = 500,
  UpgradeRequired = 501,
  PreconditionRequired = 502,
  TooManyRequests = 503,
  RequestHeaderFieldsTooLarge = 504,
  UnavailableForLegalReasons = 505,
  InternalServerError = 506,
  NotImplemented = 507,
  BadGateway = 508,
  ServiceUnavailable = 510,
  GatewayTimeout = 511,
  HttpVersionNotSupported = "HttpVersionNotSupported",
  VariantAlsoNegotiates = "VariantAlsoNegotiates",
  InsufficientStorage = "InsufficientStorage",
  LoopDetected = "LoopDetected",
  NotExtended = "NotExtended",
  NetworkAuthenticationRequired = "NetworkAuthenticationRequired",
}

/** @format int32 */
export enum GetCountiresType {
  Nationality = 10,
  Address = 20,
  CountryOfBirth = 30,
  PhoneNumber = 40,
}

/** @format int32 */
export enum GenericParameterAttributes {
  None = 0,
  Covariant = 1,
  Contravariant = 2,
  VarianceMask = 3,
  ReferenceTypeConstraint = 4,
  NotNullableValueTypeConstraint = 8,
  DefaultConstructorConstraint = 16,
  SpecialConstraintMask = 28,
}

/** @format int32 */
export enum GenderType {
  Male = 0,
  Female = 10,
  NonOrdinary = 20,
}

/** @format int32 */
export enum FriendshipState {
  Accepted = 1,
  Blocked = 2,
}

/** @format int32 */
export enum FillStatus {
  NotFilled = 0,
  Filled = 1,
  PartiallyFilled = 2,
}

/** @format int32 */
export enum FieldAttributes {
  PrivateScope = 0,
  Private = 1,
  FamANDAssem = 2,
  Assembly = 3,
  Family = 4,
  FamORAssem = 5,
  Public = 6,
  FieldAccessMask = 7,
  Static = 16,
  InitOnly = 32,
  Literal = 64,
  NotSerialized = 128,
  HasFieldRVA = 256,
  SpecialName = 512,
  RTSpecialName = 1024,
  HasFieldMarshal = 4096,
  PinvokeImpl = 8192,
  HasDefault = 32768,
  ReservedMask = 38144,
}

/** @format int32 */
export enum ExchangeOrderType {
  Unknown = 5,
  Limit = 10,
  Market = 15,
  Offer = 20,
}

/** @format int32 */
export enum EventAttributes {
  None = 0,
  SpecialName = 512,
  RTSpecialName = 1024,
  ReservedMask = "ReservedMask",
}

/** @format int32 */
export enum EntityChangeType {
  Created = 0,
  Updated = 1,
  Deleted = 2,
}

/** @format int32 */
export enum DocumentReviewStatus {
  None = 0,
  Rejected = 1,
  Accepted = 2,
}

/** @format int32 */
export enum DebitCreditType {
  Debit = 0,
  Credit = 1,
}

/** @format int32 */
export enum CriteriaBuiltInType {
  Country = 0,
  AML = 1,
  PEP = 2,
  AdversMedia = 3,
  Sanction = 4,
  LegalRegulatory = 5,
}

/** @format int32 */
export enum ChatSide {
  Sender = 1,
  Receiver = 2,
}

/** @format int32 */
export enum ChatMessageReadState {
  Unread = 1,
  Read = 2,
}

/** @format int32 */
export enum ChartDateInterval {
  Daily = 1,
  Weekly = 2,
  Monthly = 3,
}

/** @format int32 */
export enum CashPostingTranscationType {
  Deposit = 0,
  Withdraw = 1,
  Trade = 2,
}

/** @format int32 */
export enum CallingConventions {
  Standard = 1,
  VarArgs = 2,
  Any = 3,
  HasThis = 32,
  ExplicitThis = 64,
}

/** @format int32 */
export enum BranchRisk {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Prohibited = 4,
}

/** @format int32 */
export enum ApplicantStatus {
  Unknown = 0,
  InProgress = 1,
  Finished = 2,
}

/** @format int32 */
export enum ApplicantProgressStatus {
  None = 0,
  InProgress = 1,
  Finished = 2,
  OnHold = 3,
  IdentityPending = 4,
}

/** @format int32 */
export enum ApplicantDocumentType {
  Selfie = 0,
  Identity = 1,
}

/** @format int32 */
export enum ApplicantDataStatus {
  ProviderResultPending = 0,
  ProviderResultReceived = 1,
  Canceled = 2,
}

/** @format int32 */
export enum AccountingTransactionType {
  Unknown = 0,
  DepositInitiated = 1,
  DepositReceivedBank = 2,
  DepositReleasedToCash = 3,
  DepositCommissionCredit = 4,
  WithdrawalInitiated = 5,
  WithdrawalCompleted = 6,
  TokenBuyCommitted = 10,
  TokenBuySettledCash = 11,
  TokenBuySettledCSA = 12,
  TokenBuySettledFee = 13,
  TokenSellSettledCSA = 20,
  TokenSellSettledCash = 21,
  TokenSellSettledFee = 22,
  CancelOrExpireRefund = 30,
  CommissionSweep = 40,
  CommissionPayAway = 41,
  ManualTransfer = 50,
  JournalCredit = 60,
  JournalDebit = 61,
}

/** @format int32 */
export enum AccountNames {
  CBA = 1,
  CSA = 2,
  COMMITTED = 3,
  COMM = 4,
  UNCOMM = 5,
  WORLDPAY = 6,
  CASH = 7,
  UNCLEARED = 8,
}

/** @format int32 */
export enum AbpLoginResultType {
  Success = 1,
  InvalidUserNameOrEmailAddress = 2,
  InvalidPassword = 3,
  UserIsNotActive = 4,
  InvalidTenancyName = 5,
  TenantIsNotActive = 6,
  UserEmailIsNotConfirmed = 7,
  UnknownExternalLogin = 8,
  LockedOut = 9,
  UserPhoneNumberIsNotConfirmed = 10,
  FailedForOtherReason = 11,
}

export interface AcceptFriendshipRequestInput {
  /**
   * @format int64
   * @min 1
   */
  userId?: number;
  /** @format int32 */
  tenantId?: number | null;
}

export interface AccountBalances {
  chains?: Record<string, ChainBalances>;
}

export interface AccountNameListDto {
  /** @format int32 */
  accountId?: number;
  accountName?: string | null;
  accountDescription?: string | null;
}

export interface AccountStatus {
  account_id?: string | null;
  addresses?: string[] | null;
  ext_account_id?: string | null;
  trezor_whitelists?: TrezorWhitelistStatus[] | null;
}

export interface ActivateEmailInput {
  /** @format int64 */
  userId?: number;
  confirmationCode?: string | null;
  c?: string | null;
}

export interface ActivateWebhookSubscriptionInput {
  /** @format uuid */
  subscriptionId?: string;
  isActive?: boolean;
}

export interface AddNewPageInput {
  dashboardName?: string | null;
  name?: string | null;
  application?: string | null;
}

export interface AddNewPageOutput {
  pageId?: string | null;
}

export interface AddWidgetInput {
  widgetId?: string | null;
  pageId?: string | null;
  dashboardName?: string | null;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
  application?: string | null;
}

export interface AppSettingsJsonDto {
  webSiteUrl?: string | null;
  serverSiteUrl?: string | null;
  languages?: NameValue[] | null;
}

export interface ApplicantAdditionalDataDto {
  paramName?: string | null;
  value?: string | null;
}

export interface ApplicantBranchCategoryDto {
  code?: string | null;
  titleEn?: string | null;
  titleDe?: string | null;
}

export interface ApplicantBranchDto {
  code?: string | null;
  titleEn?: string | null;
  titleDe?: string | null;
  risk?: BranchRisk;
  /** @format int64 */
  categoryId?: number;
}

export interface ApplicantCompanyRequestDataDto {
  /** @format int32 */
  tenantId?: number;
  email?: string | null;
  phone?: string | null;
  lang?: string | null;
  companyName?: string | null;
  registrationNumber?: string | null;
  country?: string | null;
  legalAddress?: string | null;
  /** @format date-time */
  incorporatedOn?: string;
  controlScheme?: string | null;
  taxId?: string | null;
  registrationLocation?: string | null;
  website?: string | null;
  postalAddress?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  addressCountry?: string | null;
  noUBOs?: boolean;
  noShareholders?: boolean;
  companyShareholders?: CompanyShareholderDto[] | null;
}

export interface ApplicantDataDto {
  /** @format int64 */
  id?: number;
  providerTokenObject?: string | null;
  applicantStatus?: ApplicantDataStatus;
  providerResult?: string | null;
  applicantRequestData?: ApplicantRequestDataDto;
  companyApplicantRequestData?: ApplicantCompanyRequestDataDto;
  applicantDocuments?: ApplicantDocumentDto[] | null;
  uploadDocumentResults?: UploadDocumentResultDto[] | null;
  riskScoringResults?: RiskScoringResultDto[] | null;
  questionnaireResults?: QuestionnaireResultDto[] | null;
  kycRecords?: KycRecordDto[] | null;
}

export interface ApplicantDocumentDto {
  baseAddress?: string | null;
  documentType?: ApplicantDocumentType;
  file?: string | null;
}

export interface ApplicantRegistrationRequestInput {
  /** @format int64 */
  applicantId?: number | null;
  workflowKey?: string | null;
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  lastName: string;
  title?: string | null;
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  dateOfBirth: string;
  /** @minLength 1 */
  phonenumber: string;
  mobileCountryCode?: string | null;
  /** @minLength 1 */
  street: string;
  /** @minLength 1 */
  streetNumber: string;
  /** @minLength 1 */
  zip: string;
  /** @minLength 1 */
  city: string;
  /** @minLength 1 */
  country: string;
  nationality?: string | null;
  investorType?: InvestorType;
  taxCountry?: string | null;
  taxNumber?: string | null;
  otherNationality?: string[] | null;
  defaultLanguage?: string | null;
  countryOfBirth?: string | null;
  placeOfBirth?: string | null;
  salutation?: GenderType;
  educationLevel?: string | null;
  occupation?: string | null;
  otherTaxCountries?: TaxCountries[] | null;
  applicantAdditionalDatas?: ApplicantAdditionalDataDto[] | null;
}

export interface ApplicantRequestDataDto {
  /** @format int64 */
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  dateOfBirth?: string | null;
  phonenumber?: string | null;
  street?: string | null;
  streetNumber?: string | null;
  zip?: string | null;
  city?: string | null;
  country?: string | null;
  nationality?: string | null;
  taxCountry?: string | null;
  otherNationalities?: string[] | null;
  otherTaxResidencies?: string[] | null;
}

export interface ApplicationInfoDto {
  version?: string | null;
  /** @format date-time */
  releaseDate?: string;
  currency?: string | null;
  currencySign?: string | null;
  allowTenantsToChangeEmailSettings?: boolean;
  userDelegationIsEnabled?: boolean;
  /** @format double */
  twoFactorCodeExpireSeconds?: number;
  features?: Record<string, boolean | null>;
}

export interface ApplicationLanguageEditDto {
  /** @format int32 */
  id?: number | null;
  /**
   * @minLength 0
   * @maxLength 128
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  icon?: string | null;
  isEnabled?: boolean;
}

export interface ApplicationLanguageListDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /** @format int32 */
  tenantId?: number | null;
  name?: string | null;
  displayName?: string | null;
  icon?: string | null;
  isDisabled?: boolean;
}

export interface AppropriatenessQuestionOutput {
  /** @format int32 */
  id?: number;
  name?: string | null;
  groupName?: string | null;
  question?: string | null;
  answers?: string[] | null;
}

export interface AppropriatenessQuestionResult {
  /** @format int32 */
  appropriatenessQuestionId?: number;
  value?: string | null;
}

export interface AppropriatenessTestOutput {
  /** @format int32 */
  id?: number;
  /** @format int64 */
  applicantId?: number;
  name?: string | null;
  displayName?: string | null;
  subtitle?: string | null;
  description?: string | null;
  /** @format int32 */
  testDurationSec?: number;
  /** @format int32 */
  testAllowedMaxTry?: number;
  /** @format int32 */
  testCorrectAnswerPassLimit?: number;
  /** @format int32 */
  totalFailedTries?: number;
  /** @format int32 */
  totalQuestionCount?: number;
  waitTimeSpanForNextTry?: TimeSpan;
  appropriatenessQuestions?: AppropriatenessQuestionOutput[] | null;
}

export interface Assembly {
  definedTypes?: TypeInfo[] | null;
  exportedTypes?: Type[] | null;
  /** @deprecated */
  codeBase?: string | null;
  entryPoint?: MethodInfo;
  fullName?: string | null;
  imageRuntimeVersion?: string | null;
  isDynamic?: boolean;
  location?: string | null;
  reflectionOnly?: boolean;
  isCollectible?: boolean;
  isFullyTrusted?: boolean;
  customAttributes?: CustomAttributeData[] | null;
  /** @deprecated */
  escapedCodeBase?: string | null;
  manifestModule?: Module;
  modules?: Module[] | null;
  /** @deprecated */
  globalAssemblyCache?: boolean;
  /** @format int64 */
  hostContext?: number;
  securityRuleSet?: SecurityRuleSet;
}

export interface AssetBalance {
  /** @format int64 */
  id?: number;
  /** @format byte */
  rowVersion?: string | null;
  /** @format int64 */
  userId?: number;
  user?: User;
  /** @format int32 */
  pairId?: number | null;
  pair?: Pair;
  total?: string | null;
  available?: string | null;
  assetAddress?: string | null;
  /** @format double */
  internalTotal?: number;
  /** @format double */
  internalAvailable?: number;
}

export interface AssetBalanceListDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  userEmail?: string | null;
  digitalSecurity?: string | null;
  total?: string | null;
  available?: string | null;
  assetAddress?: string | null;
  /** @format double */
  reservedForLimitOrders?: number;
  internalTotal?: string | null;
  internalAvailable?: string | null;
}

export interface AuditLogListDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number | null;
  userName?: string | null;
  /** @format int32 */
  impersonatorTenantId?: number | null;
  /** @format int64 */
  impersonatorUserId?: number | null;
  serviceName?: string | null;
  methodName?: string | null;
  parameters?: string | null;
  /** @format date-time */
  executionTime?: string;
  /** @format int32 */
  executionDuration?: number;
  clientIpAddress?: string | null;
  clientName?: string | null;
  browserInfo?: string | null;
  exception?: string | null;
  customData?: string | null;
}

export interface AuthenticateModel {
  /**
   * @minLength 1
   * @maxLength 256
   */
  userNameOrEmailAddress: string;
  /**
   * @minLength 1
   * @maxLength 32
   */
  password: string;
  twoFactorVerificationCode?: string | null;
  rememberClient?: boolean;
  twoFactorRememberClientToken?: string | null;
  singleSignIn?: boolean | null;
  returnUrl?: string | null;
  captchaResponse?: string | null;
}

export interface AuthenticateResultModel {
  accessToken?: string | null;
  encryptedAccessToken?: string | null;
  /** @format int32 */
  expireInSeconds?: number;
  shouldResetPassword?: boolean;
  passwordResetCode?: string | null;
  /** @format int64 */
  userId?: number;
  requiresTwoFactorVerification?: boolean;
  twoFactorAuthProviders?: string[] | null;
  twoFactorRememberClientToken?: string | null;
  returnUrl?: string | null;
  refreshToken?: string | null;
  /** @format int32 */
  refreshTokenExpireInSeconds?: number;
  c?: string | null;
}

export interface BalanceListDto {
  /** @format int64 */
  id?: number;
  user?: BaseUserDto;
  account?: AccountNames;
  /** @format double */
  amount?: number;
}

export interface BaseUserDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  surname?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  status?: UserStatus;
}

export interface BlobStorageOutput {
  url?: string | null;
  thumbnail?: string | null;
}

export interface BlockUserInput {
  /**
   * @format int64
   * @min 1
   */
  userId?: number;
  /** @format int32 */
  tenantId?: number | null;
}

export interface BroadcastEvmTransactionResponseDTO {
  tx?: UnsignedEvmTransactionDTO;
  hash?: string | null;
  signature?: string | null;
  from?: string | null;
  serializedSignedTx?: string | null;
  error?: string | null;
}

export interface CacheDto {
  name?: string | null;
}

export interface CancelDirectOrderByAdminInput {
  /** @format int32 */
  pairId?: number;
  exchangeId?: string | null;
}

export interface CancelOrderInput {
  /** @format int64 */
  orderId?: number;
}

export interface CancelPaymentDto {
  paymentId?: string | null;
  gateway?: SubscriptionPaymentGatewayType;
}

export interface CashBalanceListDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  userEmail?: string | null;
  total?: string | null;
  available?: string | null;
  inOrder?: string | null;
  totalDeposit?: string | null;
  totalFee?: string | null;
  internalTotal?: string | null;
  internalAvailable?: string | null;
}

export interface CashPosting {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  user?: User;
  /** @format double */
  amount?: number;
  /** @format double */
  fee?: number;
  /** @format double */
  totalAmount?: number;
  /** @format double */
  userBalanceAfterPosting?: number;
  debitCredit?: DebitCreditType;
  transcationType?: CashPostingTranscationType;
  detail?: string | null;
  /** @format int64 */
  tradeId?: number | null;
  /** @format int64 */
  depositId?: number | null;
  /** @format int64 */
  withdrawId?: number | null;
  /** @format date-time */
  creationTime?: string;
  transactionId?: string | null;
}

export interface CashPostingListDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  userEmail?: string | null;
  amount?: string | null;
  fee?: string | null;
  totalAmount?: string | null;
  userBalanceAfterPosting?: string | null;
  debitCredit?: DebitCreditType;
  transactionType?: CashPostingTranscationType;
  /** @format date-time */
  creationTime?: string;
  transactionId?: string | null;
}

export interface Category {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  title?: string | null;
  color?: string | null;
  imageAddress?: string | null;
  pairs?: PairCategory[] | null;
}

export interface CategoryDto {
  /** @format int32 */
  id?: number;
  title?: string | null;
  color?: string | null;
  imageAddress?: string | null;
}

export interface CategoryEditDto {
  /** @format int32 */
  id?: number;
  title?: string | null;
  color?: string | null;
  imageAddress?: string | null;
}

export interface ChainBalanceRequest {
  chain_id?: string | null;
  erc20s?: string[] | null;
  include_traced_erc20_stashes?: boolean | null;
  restrict_traced_erc20s?: boolean | null;
  trezors?: string[] | null;
}

export interface ChainBalances {
  erc20s?: Record<string, string>;
  trezors?: Record<string, TrezorBalances>;
  wei_balance?: string | null;
}

export interface ChainDef {
  /** @format int32 */
  id?: number | null;
  name?: string | null;
  str_ids?: string[] | null;
}

export interface ChangeEmailInput {
  c?: string | null;
}

export interface ChangePasswordInput {
  /** @minLength 1 */
  currentPassword: string;
  /** @minLength 1 */
  newPassword: string;
}

export interface ChangeUserLanguageDto {
  /** @minLength 1 */
  languageName: string;
}

export interface ChatMessageDto {
  /** @format int32 */
  id?: number;
  /** @format int64 */
  userId?: number;
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  targetUserId?: number;
  /** @format int32 */
  targetTenantId?: number | null;
  side?: ChatSide;
  readState?: ChatMessageReadState;
  receiverReadState?: ChatMessageReadState;
  message?: string | null;
  /** @format date-time */
  creationTime?: string;
  sharedMessageId?: string | null;
}

export interface CheckDatabaseOutput {
  isDatabaseExist?: boolean;
}

export interface CleanValuesInput {
  /** @format int32 */
  dynamicEntityPropertyId?: number;
  entityId?: string | null;
}

export interface ComboboxItemDto {
  value?: string | null;
  displayText?: string | null;
  isSelected?: boolean;
}

export interface CompanyShareholderDto {
  /** @format int64 */
  id?: number;
  email?: string | null;
  isVerified?: boolean;
}

export interface ConstructorInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  memberType?: MemberTypes;
}

export interface ContractDeployment {
  address?: string | null;
  /** @format int32 */
  chain_id?: number | null;
}

export interface Country {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  name?: string | null;
  abbreviation?: string | null;
  abbreviation3?: string | null;
  callingCode?: string | null;
}

export interface CountryDto {
  name?: string | null;
  abbreviation?: string | null;
  abbreviation3?: string | null;
}

export interface CreateApplicantResult {
  currentStep?: FlowStep;
  flowSteps?: FlowStep[] | null;
}

export interface CreateEditionDto {
  edition: EditionCreateDto;
  featureValues: NameValueDto[];
}

export interface CreateFriendshipForCurrentTenantInput {
  userName?: string | null;
}

export interface CreateFriendshipRequestInput {
  /**
   * @format int64
   * @min 1
   */
  userId?: number;
  /** @format int32 */
  tenantId?: number | null;
}

export interface CreateFriendshipWithDifferentTenantInput {
  tenancyName: string;
  userName?: string | null;
}

export interface CreateInvoiceDto {
  /** @format int64 */
  subscriptionPaymentId?: number;
}

export interface CreateMassNotificationInput {
  message?: string | null;
  severity?: NotificationSeverity;
  userIds?: number[] | null;
  organizationUnitIds?: number[] | null;
  targetNotifiers?: string[] | null;
}

export interface CreateOrEditNewsDto {
  /** @format int32 */
  id?: number | null;
  header?: string | null;
  miniDescription?: string | null;
  description?: string | null;
  slug?: string | null;
  accessibility?: NewsAccessibility;
  /** @format int32 */
  pairId?: number | null;
  pair?: PairsDto;
  isPublished?: boolean;
  descriptionDraft?: string | null;
  coverImage?: string | null;
  thumbnailImage?: string | null;
}

export interface CreateOrUpdateLanguageInput {
  language: ApplicationLanguageEditDto;
}

export interface CreateOrUpdatePairDocumentDto {
  /** @format int32 */
  id?: number | null;
  /** @format int32 */
  pairId?: number;
  url?: string | null;
  title?: string | null;
  isExternal?: boolean;
}

export interface CreateOrUpdatePairPerkDto {
  /** @format int32 */
  id?: number | null;
  /** @format double */
  price?: number;
  title?: string | null;
  imageUrl?: string | null;
  /** @format int32 */
  pairId?: number;
}

export interface CreateOrUpdatePairUIKeyValueDto {
  /** @format int32 */
  id?: number | null;
  key?: string | null;
  value?: string | null;
  type?: string | null;
  /** @format int32 */
  pairId?: number;
}

export interface CreateOrUpdateRoleInput {
  role: RoleEditDto;
  grantedPermissionNames: string[];
}

export interface CreateOrUpdateStaticPageDto {
  /** @format int32 */
  id?: number | null;
  name?: string | null;
  slug?: string | null;
  title?: string | null;
  subTitle?: string | null;
  externalUrl?: string | null;
  pageTitle?: string | null;
  body?: string | null;
}

export interface CreateOrUpdateUserInput {
  user: UserEditDto;
  assignedRoleNames: string[];
  sendActivationEmail?: boolean;
  setRandomPassword?: boolean;
  organizationUnits?: number[] | null;
}

export interface CreateOrderinput {
  pairId?: string | null;
  slippage?: string | null;
  quantity?: string | null;
  price?: string | null;
  expire?: OrderExpireOption;
}

export interface CreateOrganizationUnitInput {
  /** @format int64 */
  parentId?: number | null;
  /**
   * @minLength 0
   * @maxLength 128
   */
  displayName: string;
}

export interface CreatePairDto {
  symbol?: string | null;
}

export interface CreatePaymentDto {
  /** @format int32 */
  tenantId?: number;
  paymentPeriodType?: PaymentPeriodType;
  subscriptionPaymentGatewayType?: SubscriptionPaymentGatewayType;
  recurringPaymentEnabled?: boolean | null;
  isProrationPayment?: boolean | null;
  successUrl?: string | null;
  errorUrl?: string | null;
  extraProperties?: Record<string, any>;
  products?: CreatePaymentProductDto[] | null;
}

export interface CreatePaymentProductDto {
  description?: string | null;
  /** @format double */
  amount?: number;
  /** @format int32 */
  count?: number;
  extraProperties?: Record<string, any>;
}

export interface CreateTenantInput {
  /**
   * @minLength 0
   * @maxLength 64
   * @pattern ^[a-zA-Z][a-zA-Z0-9_-]{1,}$
   */
  tenancyName: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  name: string;
  /**
   * @format email
   * @minLength 0
   * @maxLength 256
   */
  adminEmailAddress: string;
  /**
   * @minLength 0
   * @maxLength 64
   */
  adminName?: string | null;
  /**
   * @minLength 0
   * @maxLength 64
   */
  adminSurname?: string | null;
  /**
   * @minLength 0
   * @maxLength 128
   */
  adminPassword?: string | null;
  /** @maxLength 1024 */
  connectionString?: string | null;
  shouldChangePasswordOnNextLogin?: boolean;
  sendActivationEmail?: boolean;
  /** @format int32 */
  editionId?: number | null;
  isActive?: boolean;
  /** @format date-time */
  subscriptionEndDateUtc?: string | null;
  isInTrialPeriod?: boolean;
}

export interface CreateUserDelegationDto {
  /**
   * @format int64
   * @min 1
   */
  targetUserId: number;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
}

export interface CriteriaValueInput {
  /** @format int32 */
  riskCriteriaId?: number;
  values?: string[] | null;
}

export interface CurrentUserProfileDto {
  name?: string | null;
  surname?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  isPhoneNumberConfirmed?: boolean;
  timezone?: string | null;
  kycStatus?: UserKYCStatus;
  investorType?: InvestorType;
  status?: UserStatus;
  verifiedLevel?: KycType;
  riskLevel?: UserRiskLevel;
  isEmailConfirmed?: boolean;
  referenceId?: string | null;
}

export interface CurrentUserProfileEditDto {
  /**
   * @minLength 0
   * @maxLength 64
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 64
   */
  surname: string;
  /**
   * @minLength 0
   * @maxLength 256
   */
  userName: string;
  /**
   * @minLength 0
   * @maxLength 256
   */
  emailAddress: string;
  /**
   * @minLength 0
   * @maxLength 24
   */
  phoneNumber?: string | null;
  isPhoneNumberConfirmed?: boolean;
  timezone?: string | null;
  qrCodeSetupImageUrl?: string | null;
  isGoogleAuthenticatorEnabled?: boolean;
}

export interface CustomAttributeData {
  attributeType?: Type;
  constructor?: ConstructorInfo;
  constructorArguments?: CustomAttributeTypedArgument[] | null;
  namedArguments?: CustomAttributeNamedArgument[] | null;
}

export interface CustomAttributeNamedArgument {
  memberInfo?: MemberInfo;
  typedValue?: CustomAttributeTypedArgument;
  memberName?: string | null;
  isField?: boolean;
}

export interface CustomAttributeTypedArgument {
  argumentType?: Type;
  value?: any;
}

export interface Dashboard {
  dashboardName?: string | null;
  pages?: Page[] | null;
}

export interface DashboardDefListDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  url?: string | null;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
}

export interface DashboardOutput {
  name?: string | null;
  widgets?: WidgetOutput[] | null;
}

export interface DateFieldOutput {
  /** @format date-time */
  date?: string;
}

export interface DateRangeFieldOutput {
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}

export interface DateWithTextFieldOutput {
  /** @format date-time */
  date?: string;
  text?: string | null;
}

export interface DebitAndCreditListDto {
  /** @format int64 */
  id?: number;
  transactionType?: AccountingTransactionType;
  user?: BaseUserDto;
  account?: AccountNames;
  /** @format double */
  amount?: number;
  detail?: string | null;
  transactionId?: string | null;
  /** @format double */
  balanceAfter?: number;
  /** @format date-time */
  creationTime?: string;
}

export interface DelegatedImpersonateInput {
  /** @format int64 */
  userDelegationId?: number;
}

export interface DeleteAccountFromWhitelistRequest {
  ext_account_id?: string | null;
  trezors?: ContractDeployment[] | null;
}

export interface DepositTransaction {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /** @format int64 */
  userId?: number;
  user?: User;
  /** @format double */
  amount?: number;
  comment?: string | null;
  externalId?: string | null;
  paymentStatus?: PaymentStatus;
  transferStatus?: TopupTransferStatus;
  method?: TopupMethod;
}

export interface DeserializeExchangeOrderResponse {
  pairId?: string | null;
  pairQuoteTokenDecimals?: string | null;
  pairServeFixedFee?: string | null;
  /** @format int64 */
  orderEventTs?: number | null;
  /** @format int32 */
  orderId?: number | null;
  orderQuantity?: string | null;
  orderRemainingQuantity?: string | null;
  orderPrice?: string | null;
  orderVolume?: string | null;
  orderType?: string | null;
  orderIsBid?: boolean | null;
  orderIsFilled?: boolean | null;
  orderIsCancelled?: boolean | null;
  orderIsExpired?: boolean | null;
  /** @format int64 */
  orderCreateTs?: number | null;
  /** @format int64 */
  orderExpireTs?: number | null;
}

export interface DeserializeExchangeTradeResponse {
  pairId?: string | null;
  pairQuoteTokenDecimals?: string | null;
  /** @format int32 */
  tradeId?: number | null;
  tradeHash?: string | null;
  /** @format int64 */
  tradeTimestamp?: number | null;
  tradeCreatorAddr?: string | null;
  tradeType?: string | null;
  tradeIsBuy?: boolean | null;
  tradeBidFee?: string | null;
  tradeAskFee?: string | null;
  tradeQuantity?: string | null;
  tradePrice?: string | null;
  tradeVolume?: string | null;
  bidOrderId?: string | null;
  bidOrderQuantity?: string | null;
  bidOrderRemainingQuantity?: string | null;
  bidOrderPrice?: string | null;
  askOrderId?: string | null;
  askOrderQuantity?: string | null;
  askOrderRemainingQuantity?: string | null;
  askOrderPrice?: string | null;
}

export interface DeserializeExchangeTradeResponseForView {
  chain_id?: string | null;
  chain_name?: string | null;
  pair_id?: string | null;
  pair_quote_token_decimals?: string | null;
  /** @format int32 */
  trade_id?: number | null;
  trade_hash?: string | null;
  /** @format int64 */
  trade_timestamp?: number | null;
  trade_creator_addr?: string | null;
  trade_type?: string | null;
  trade_is_buy?: boolean | null;
  trade_bid_fee?: string | null;
  trade_ask_fee?: string | null;
  trade_quantity?: string | null;
  trade_price?: string | null;
  trade_volume?: string | null;
  bid_order_id?: string | null;
  bid_order_hash?: string | null;
  bid_order_broker_id?: string | null;
  bid_order_creator_addr?: string | null;
  bid_order_quantity?: string | null;
  bid_order_remaining_quantity?: string | null;
  bid_order_price?: string | null;
  bid_order_volume?: string | null;
  bid_order_is_filled?: boolean | null;
  bid_order_is_cancelled?: boolean | null;
  bid_order_is_expired?: boolean | null;
  bid_order_create_ts?: string | null;
  bid_order_expire_ts?: string | null;
  bid_order_data?: string | null;
  ask_order_id?: string | null;
  ask_order_hash?: string | null;
  ask_order_broker_id?: string | null;
  ask_order_creator_addr?: string | null;
  ask_order_quantity?: string | null;
  ask_order_remaining_quantity?: string | null;
  ask_order_price?: string | null;
  ask_order_volume?: string | null;
  ask_order_is_filled?: boolean | null;
  ask_order_is_cancelled?: boolean | null;
  ask_order_is_expired?: boolean | null;
  ask_order_create_ts?: string | null;
  ask_order_expire_ts?: string | null;
  ask_order_data?: string | null;
}

export interface DeserializeExchnageOrderResponseForView {
  index_tx_hash?: string | null;
  /** @format int64 */
  index_tx_log_idx?: number | null;
  chain_id?: string | null;
  chain_name?: string | null;
  pair_id?: string | null;
  pair_trezor_addr?: string | null;
  pair_trezor_ledger_id?: string | null;
  pair_quote_token_addr?: string | null;
  pair_quote_token_name?: string | null;
  pair_quote_token_symbol?: string | null;
  pair_quote_token_decimals?: string | null;
  pair_quote_token_total_supply?: string | null;
  pair_serve_fixed_fee?: string | null;
  pair_volume_micro_percentage_fee?: string | null;
  pair_last_trade_price?: string | null;
  pair_last_trade_id?: string | null;
  pair_fee_collector_addr?: string | null;
  /** @format int64 */
  order_event_ts?: number | null;
  /** @format int64 */
  order_id?: number | null;
  order_hash?: string | null;
  order_creator_addr?: string | null;
  order_quantity?: string | null;
  order_remaining_quantity?: string | null;
  order_price?: string | null;
  order_volume?: string | null;
  order_remaining_volume?: string | null;
  order_slippage?: string | null;
  order_type?: string | null;
  order_is_bid?: boolean | null;
  order_is_filled?: boolean | null;
  order_is_cancelled?: boolean | null;
  order_is_expired?: boolean | null;
  order_create_ts?: string | null;
  order_expire_ts?: string | null;
  order_data?: string | null;
}

export interface DynamicEntityPropertyDto {
  /** @format int32 */
  id?: number;
  entityFullName?: string | null;
  dynamicPropertyName?: string | null;
  /** @format int32 */
  dynamicPropertyId?: number;
  /** @format int32 */
  tenantId?: number | null;
}

export interface DynamicEntityPropertyValueDto {
  /** @format int32 */
  id?: number;
  value?: string | null;
  entityId?: string | null;
  /** @format int32 */
  dynamicEntityPropertyId?: number;
}

export interface DynamicPropertyDto {
  /** @format int32 */
  id?: number;
  propertyName?: string | null;
  displayName?: string | null;
  inputType?: string | null;
  permission?: string | null;
  /** @format int32 */
  tenantId?: number | null;
}

export interface DynamicPropertyValueDto {
  /** @format int32 */
  id?: number;
  value?: string | null;
  /** @format int32 */
  tenantId?: number | null;
  /** @format int32 */
  dynamicPropertyId?: number;
}

export interface EditPairDescriptionDto {
  /** @format int32 */
  id?: number;
  descriptionBody?: string | null;
}

export interface EditPairDto {
  /** @format int32 */
  id?: number | null;
  /** @format int32 */
  quoteTokenDecimal?: number;
  /** @format int32 */
  baseTokenDecimal?: number;
  exchangePairId?: string | null;
  orderbook?: string | null;
  chainId?: string | null;
  baseTokenAddress?: string | null;
  quoteTokenAddress?: string | null;
  trezorAddress?: string | null;
  symbol?: string | null;
  baseTokenSymbol?: string | null;
  quoteTokenSymbol?: string | null;
  logoAddress?: string | null;
  coverAddress?: string | null;
  isActive?: boolean;
  title?: string | null;
  description?: string | null;
  /** @format int32 */
  ownerId?: number | null;
  /** @format int32 */
  miFIDTestId?: number | null;
  stockName?: string | null;
  stockDetails?: string | null;
  /** @format int64 */
  icoLiquidityUserId?: number | null;
  /** @format double */
  pairFixedFee?: number;
  /** @format double */
  pairMicroPercentageFee?: number;
  categories?: number[] | null;
}

export interface EditionCreateDto {
  /** @format int32 */
  id?: number | null;
  /** @minLength 1 */
  displayName: string;
  /** @format double */
  monthlyPrice?: number | null;
  /** @format double */
  annualPrice?: number | null;
  /** @format int32 */
  trialDayCount?: number | null;
  /** @format int32 */
  waitingDayAfterExpire?: number | null;
  /** @format int32 */
  expiringEditionId?: number | null;
}

export interface EditionEditDto {
  /** @format int32 */
  id?: number | null;
  /** @minLength 1 */
  displayName: string;
  /** @format int32 */
  expiringEditionId?: number | null;
}

export interface EditionInfoDto {
  /** @format int32 */
  id?: number;
  displayName?: string | null;
  /** @format int32 */
  trialDayCount?: number | null;
  /** @format double */
  monthlyPrice?: number | null;
  /** @format double */
  annualPrice?: number | null;
  isHighestEdition?: boolean;
  isFree?: boolean;
}

export interface EditionListDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  displayName?: string | null;
  /** @format double */
  monthlyPrice?: number | null;
  /** @format double */
  annualPrice?: number | null;
  /** @format int32 */
  waitingDayAfterExpire?: number | null;
  /** @format int32 */
  trialDayCount?: number | null;
  expiringEditionDisplayName?: string | null;
}

export interface EditionSelectDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  displayName?: string | null;
  /** @format int32 */
  expiringEditionId?: number | null;
  /** @format double */
  monthlyPrice?: number | null;
  /** @format double */
  annualPrice?: number | null;
  /** @format int32 */
  trialDayCount?: number | null;
  /** @format int32 */
  waitingDayAfterExpire?: number | null;
  isFree?: boolean;
}

export interface EditionWithFeaturesDto {
  edition?: EditionSelectDto;
  featureValues?: NameValueDto[] | null;
}

export interface EditionsSelectOutput {
  allFeatures?: FlatFeatureSelectDto[] | null;
  editionsWithFeatures?: EditionWithFeaturesDto[] | null;
}

export interface EmailSettingsEditDto {
  defaultFromAddress?: string | null;
  defaultFromDisplayName?: string | null;
  smtpHost?: string | null;
  /** @format int32 */
  smtpPort?: number;
  smtpUserName?: string | null;
  smtpPassword?: string | null;
  smtpDomain?: string | null;
  smtpEnableSsl?: boolean;
  smtpUseDefaultCredentials?: boolean;
}

export interface EntityChangeListDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number | null;
  userName?: string | null;
  /** @format date-time */
  changeTime?: string;
  entityTypeFullName?: string | null;
  changeType?: EntityChangeType;
  changeTypeName?: string | null;
  /** @format int64 */
  entityChangeSetId?: number;
}

export interface EntityDto {
  /** @format int32 */
  id?: number;
}

export interface EntityDtoOfGuid {
  /** @format uuid */
  id?: string;
}

export interface EntityDtoOfInt64 {
  /** @format int64 */
  id?: number;
}

export interface EntityDtoOfString {
  id?: string | null;
}

export interface EntityPropertyChangeDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  entityChangeId?: number;
  newValue?: string | null;
  originalValue?: string | null;
  propertyName?: string | null;
  propertyTypeFullName?: string | null;
  /** @format int32 */
  tenantId?: number | null;
}

export interface EnvironmentVariablesDto {
  environmentName?: string | null;
  veroBaseUrl?: string | null;
  agoraApiKey?: string | null;
  agoraBaseUrl?: string | null;
  agoraTransactorUrl?: string | null;
  agoraChannelId?: string | null;
  agoraCashDecimal?: string | null;
  agoraTransactorDomainId?: string | null;
  agoraTransactorEthAccountProvider?: string | null;
  blobManagerAzureBaseUrl?: string | null;
  uniqueBrokerName?: string | null;
  azureSignalRConnectionString?: string | null;
  rabbitHostName?: string | null;
  rabbitQueueName?: string | null;
  rabbitFetchCount?: string | null;
}

export interface EventInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  attributes?: EventAttributes;
  isSpecialName?: boolean;
  addMethod?: MethodInfo;
  removeMethod?: MethodInfo;
  raiseMethod?: MethodInfo;
  isMulticast?: boolean;
  eventHandlerType?: Type;
}

export interface ExpiringTenant {
  tenantName?: string | null;
  /** @format int32 */
  remainingDayCount?: number;
}

export interface ExternalAuthenticateModel {
  /**
   * @minLength 1
   * @maxLength 128
   */
  authProvider: string;
  /**
   * @minLength 1
   * @maxLength 256
   */
  providerKey: string;
  /** @minLength 1 */
  providerAccessCode: string;
  returnUrl?: string | null;
  singleSignIn?: boolean | null;
}

export interface ExternalAuthenticateResultModel {
  accessToken?: string | null;
  encryptedAccessToken?: string | null;
  /** @format int32 */
  expireInSeconds?: number;
  waitingForActivation?: boolean;
  returnUrl?: string | null;
  refreshToken?: string | null;
  /** @format int32 */
  refreshTokenExpireInSeconds?: number;
}

export interface ExternalLoginProviderInfoModel {
  name?: string | null;
  clientId?: string | null;
  additionalParams?: Record<string, string | null>;
}

export interface ExternalLoginProviderSettingsEditDto {
  facebook_IsDeactivated?: boolean;
  facebook?: FacebookExternalLoginProviderSettings;
  google_IsDeactivated?: boolean;
  google?: GoogleExternalLoginProviderSettings;
  twitter_IsDeactivated?: boolean;
  twitter?: TwitterExternalLoginProviderSettings;
  microsoft_IsDeactivated?: boolean;
  microsoft?: MicrosoftExternalLoginProviderSettings;
  openIdConnect_IsDeactivated?: boolean;
  openIdConnect?: OpenIdConnectExternalLoginProviderSettings;
  openIdConnectClaimsMapping?: JsonClaimMapDto[] | null;
  wsFederation_IsDeactivated?: boolean;
  wsFederation?: WsFederationExternalLoginProviderSettings;
  wsFederationClaimsMapping?: JsonClaimMapDto[] | null;
}

export interface ExternalLoginSettingsDto {
  enabledSocialLoginSettings?: string[] | null;
}

export interface FacebookExternalLoginProviderSettings {
  appId?: string | null;
  appSecret?: string | null;
}

export interface FeatureInputTypeDto {
  name?: string | null;
  attributes?: Record<string, any>;
  validator?: IValueValidator;
  itemSource?: LocalizableComboboxItemSourceDto;
}

export interface FeeCalculationListDto {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  wallet?: string | null;
  /** @format int32 */
  quoteTokenDecimal?: number;
  userEmail?: string | null;
  emailSent?: boolean;
  systemLog?: string | null;
  totalFee?: string | null;
  brokerFee?: string | null;
  csdFee?: string | null;
  exchangeFee?: string | null;
  buy?: boolean | null;
  tradeId?: string | null;
  price?: string | null;
  quantity?: string | null;
  timestamp?: string | null;
  volume?: string | null;
}

export interface FieldInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  attributes?: FieldAttributes;
  fieldType?: Type;
  isInitOnly?: boolean;
  isLiteral?: boolean;
  /** @deprecated */
  isNotSerialized?: boolean;
  isPinvokeImpl?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  fieldHandle?: RuntimeFieldHandle;
}

export interface FileDto {
  /** @minLength 1 */
  fileName: string;
  fileType?: string | null;
  /** @minLength 1 */
  fileToken: string;
}

export interface FillAppropriatenessTestInput {
  /** @format int64 */
  applicantId?: number;
  /** @format int32 */
  appropriatenessTestId?: number;
  appropriatenessQuestionResults?: AppropriatenessQuestionResult[] | null;
}

export interface FillAppropriatenessTestResult {
  isSuccess?: boolean;
  nextStep?: FlowStep;
  message?: string | null;
}

export interface FillQuestionnairesResult {
  isSuccess?: boolean;
  nextStep?: FlowStep;
  message?: string | null;
}

export interface FillQuestionnarieInput {
  /** @format int64 */
  applicantId?: number;
  /** @format int32 */
  questionnarieId?: number;
  questionResults?: QuestionResult[] | null;
}

export interface FindOrganizationUnitRolesInput {
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  maxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  skipCount?: number;
  filter?: string | null;
  /** @format int64 */
  organizationUnitId?: number;
}

export interface FindOrganizationUnitUsersInput {
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  maxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  skipCount?: number;
  filter?: string | null;
  /** @format int64 */
  organizationUnitId?: number;
}

export interface FindOrganizationUnitUsersOutputDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  surname?: string | null;
  emailAddress?: string | null;
}

export interface FindUsersInput {
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  maxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  skipCount?: number;
  filter?: string | null;
  /** @format int32 */
  tenantId?: number | null;
  excludeCurrentUser?: boolean;
}

export interface FindUsersOutputDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  surname?: string | null;
  emailAddress?: string | null;
}

export interface FlatFeatureDto {
  parentName?: string | null;
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  defaultValue?: string | null;
  inputType?: FeatureInputTypeDto;
}

export interface FlatFeatureSelectDto {
  parentName?: string | null;
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  defaultValue?: string | null;
  inputType?: IInputType;
  textHtmlColor?: string | null;
}

export interface FlatPermissionDto {
  parentName?: string | null;
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  isGrantedByDefault?: boolean;
}

export interface FlatPermissionWithLevelDto {
  parentName?: string | null;
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  isGrantedByDefault?: boolean;
  /** @format int32 */
  level?: number;
}

export interface FlowStep {
  /** @format int32 */
  order?: number;
  action?: WorkflowStepAction;
  name?: string | null;
  description?: string | null;
}

export interface FriendDto {
  /** @format int64 */
  friendUserId?: number;
  /** @format int32 */
  friendTenantId?: number | null;
  friendUserName?: string | null;
  friendTenancyName?: string | null;
  /** @format uuid */
  friendProfilePictureId?: string | null;
  /** @format int32 */
  unreadMessageCount?: number;
  isOnline?: boolean;
  state?: FriendshipState;
}

export interface GeneralSettingsEditDto {
  timezone?: string | null;
  timezoneForComparison?: string | null;
}

export interface GenerateGoogleAuthenticatorKeyOutput {
  qrCodeSetupImageUrl?: string | null;
  googleAuthenticatorKey?: string | null;
}

export interface GetAccountBalancesRequest {
  accounts?: string[] | null;
  chains?: ChainBalanceRequest[] | null;
}

export interface GetAccountBalancesResponse {
  accounts?: Record<string, AccountBalances>;
}

export interface GetAccountStatusResponse {
  status?: AccountStatus;
}

export interface GetAccountTrezorHistoryResponse {
  entries?: TrezorHistoryEntry[] | null;
  /** @format int32 */
  total?: number | null;
}

export interface GetAccountTrezorHistoryResquest {
  account?: string | null;
  chain_id?: string | null;
  contract?: string | null;
  /** @format int32 */
  page?: number | null;
  /** @format int32 */
  page_size?: number | null;
  trezor?: string | null;
}

export interface GetAllAssetsForTransferOutput {
  /** @format int32 */
  tokenDecimal?: number;
  tokenAddress?: string | null;
  trezorAddress?: string | null;
  symbol?: string | null;
}

export interface GetAllAvailableWebhooksOutput {
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
}

export interface GetAllDynamicEntityPropertyValuesOutput {
  items?: GetAllDynamicEntityPropertyValuesOutputItem[] | null;
}

export interface GetAllDynamicEntityPropertyValuesOutputItem {
  /** @format int32 */
  dynamicEntityPropertyId?: number;
  propertyName?: string | null;
  inputType?: IInputType;
  selectedValues?: string[] | null;
  allValuesInputTypeHas?: string[] | null;
}

export interface GetAllEntitiesHasDynamicPropertyOutput {
  entityFullName?: string | null;
}

export interface GetAllNewsDto {
  /** @format int32 */
  id?: number;
  header?: string | null;
  miniDescription?: string | null;
  accessibility?: NewsAccessibility;
  isPublished?: boolean;
  coverImage?: string | null;
}

export interface GetAllSendAttemptsOfWebhookEventOutput {
  /** @format uuid */
  id?: string;
  webhookUri?: string | null;
  /** @format uuid */
  webhookSubscriptionId?: string;
  response?: string | null;
  responseStatusCode?: HttpStatusCode;
  /** @format date-time */
  creationTime?: string;
  /** @format date-time */
  lastModificationTime?: string | null;
}

export interface GetAllSendAttemptsOutput {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  webhookEventId?: string;
  webhookName?: string | null;
  data?: string | null;
  response?: string | null;
  responseStatusCode?: HttpStatusCode;
  /** @format date-time */
  creationTime?: string;
}

export interface GetAllStatisticOutput {
  totalFee?: string | null;
  totalQty?: string | null;
}

export interface GetAllSubscriptionsOutput {
  /** @format uuid */
  id?: string;
  webhookUri?: string | null;
  isActive?: boolean;
  webhooks?: string[] | null;
}

export interface GetAllUsersForTransferOutput {
  /** @format int64 */
  id?: number;
  emailAddress?: string | null;
}

export interface GetBalanceOutput {
  total?: string | null;
  available?: string | null;
  inOrder?: string | null;
  /** @format double */
  decimal?: number;
}

export interface GetChainsResponse {
  chains?: ChainDef[] | null;
}

export interface GetContractNoteOutput {
  fullName?: string | null;
  address?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  accountType?: string | null;
  tradeDate?: string | null;
  executionVenue?: string | null;
  settlementDate?: string | null;
  orderReference?: string | null;
  orderType?: string | null;
  stockName?: string | null;
  stockDetails?: string | null;
  quantity?: string | null;
  price?: string | null;
  consideration?: string | null;
  brokerComission?: string | null;
  exchangeFee?: string | null;
  settlementFee?: string | null;
  total?: string | null;
  trades?: GetContractNoteTradesOutput[] | null;
  bid?: boolean;
}

export interface GetContractNoteTradesOutput {
  reference?: string | null;
  quantity?: string | null;
  price?: string | null;
  consideration?: string | null;
}

export interface GetCreateOrderQuoteOutput {
  volume?: string | null;
  fixedFeeValue?: string | null;
  pairMicroPercentageFee?: string | null;
  microPercentageFeeValue?: string | null;
}

export interface GetCurrentLoginInformationsOutput {
  user?: UserLoginInfoDto;
  impersonatorUser?: UserLoginInfoDto;
  tenant?: TenantLoginInfoDto;
  impersonatorTenant?: TenantLoginInfoDto;
  application?: ApplicationInfoDto;
  theme?: UiCustomizationSettingsDto;
}

export interface GetDailySalesOutput {
  dailySales?: number[] | null;
}

export interface GetDashboardDataOutput {
  /** @format int32 */
  totalProfit?: number;
  /** @format int32 */
  newFeedbacks?: number;
  /** @format int32 */
  newOrders?: number;
  /** @format int32 */
  newUsers?: number;
  salesSummary?: SalesSummaryData[] | null;
  /** @format int32 */
  totalSales?: number;
  /** @format int32 */
  revenue?: number;
  /** @format int32 */
  expenses?: number;
  /** @format int32 */
  growth?: number;
  /** @format int32 */
  transactionPercent?: number;
  /** @format int32 */
  newVisitPercent?: number;
  /** @format int32 */
  bouncePercent?: number;
  dailySales?: number[] | null;
  profitShares?: number[] | null;
}

export interface GetDashboardDefForViewDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  url?: string | null;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
}

export interface GetDefaultEditionNameOutput {
  name?: string | null;
}

export interface GetEditionEditOutput {
  edition?: EditionEditDto;
  featureValues?: NameValueDto[] | null;
  features?: FlatFeatureDto[] | null;
}

export interface GetEditionTenantStatisticsOutput {
  editionStatistics?: TenantEdition[] | null;
}

export interface GetExpiringTenantsOutput {
  expiringTenants?: ExpiringTenant[] | null;
  /** @format int32 */
  subscriptionEndAlertDayCount?: number;
  /** @format int32 */
  maxExpiringTenantsShownCount?: number;
  /** @format date-time */
  subscriptionEndDateStart?: string;
  /** @format date-time */
  subscriptionEndDateEnd?: string;
}

export interface GetForEditNewsDto {
  /** @format int32 */
  id?: number | null;
  header?: string | null;
  miniDescription?: string | null;
  description?: string | null;
  slug?: string | null;
  accessibility?: NewsAccessibility;
  /** @format int32 */
  pairId?: number | null;
  pair?: PairsDto;
  isPublished?: boolean;
  descriptionDraft?: string | null;
  coverImage?: string | null;
  coverImageAddress?: string | null;
  thumbnailImage?: string | null;
  thumbnailImageAddress?: string | null;
}

export interface GetForEditPairDocumentDto {
  /** @format int32 */
  id?: number | null;
  /** @format int32 */
  pairId?: number;
  url?: string | null;
  title?: string | null;
  isExternal?: boolean;
}

export interface GetForEditPairDto {
  /** @format int32 */
  id?: number | null;
  /** @format int32 */
  quoteTokenDecimal?: number;
  /** @format int32 */
  baseTokenDecimal?: number;
  exchangePairId?: string | null;
  orderbook?: string | null;
  chainId?: string | null;
  baseTokenAddress?: string | null;
  quoteTokenAddress?: string | null;
  trezorAddress?: string | null;
  symbol?: string | null;
  baseTokenSymbol?: string | null;
  quoteTokenSymbol?: string | null;
  logoAddress?: string | null;
  coverAddress?: string | null;
  isActive?: boolean;
  title?: string | null;
  description?: string | null;
  descriptionBody?: string | null;
  stockName?: string | null;
  stockDetails?: string | null;
  /** @format int32 */
  ownerId?: number | null;
  /** @format int32 */
  miFIDTestId?: number | null;
  /** @format double */
  pairFixedFee?: number;
  /** @format double */
  pairMicroPercentageFee?: number;
  categories?: number[] | null;
}

export interface GetForEditPairPerkDto {
  /** @format int32 */
  id?: number | null;
  /** @format double */
  price?: number;
  title?: string | null;
  imageUrl?: string | null;
  /** @format int32 */
  pairId?: number;
}

export interface GetForEditPairUIKeyValueDto {
  /** @format int32 */
  id?: number | null;
  key?: string | null;
  value?: string | null;
  type?: string | null;
  /** @format int32 */
  pairId?: number;
}

export interface GetForEditStaticPageDto {
  /** @format int32 */
  id?: number | null;
  name?: string | null;
  slug?: string | null;
  title?: string | null;
  subTitle?: string | null;
  externalUrl?: string | null;
  pageTitle?: string | null;
  body?: string | null;
}

export interface GetForEditUserIssueDto {
  /** @format int64 */
  id?: number | null;
  /** @format int64 */
  userId?: number;
  status?: UserStatus;
  solved?: boolean;
  comment?: string | null;
}

export interface GetForViewDebitAndCreditDto {
  /** @format int64 */
  id?: number;
  transactionType?: AccountingTransactionType;
  user?: BaseUserDto;
  account?: AccountNames;
  /** @format double */
  amount?: number;
  detail?: string | null;
  transactionId?: string | null;
  /** @format date-time */
  creationTime?: string;
}

export interface GetForViewLocalOrderDto {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  digitalSecurity?: string | null;
  creatorUser?: BaseUserDto;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  rawData?: string | null;
  trades?: GetForViewLocalTradeDto[] | null;
  alarm_abi?: string | null;
  alarm_data?: string | null;
  bid?: boolean | null;
  cancelled?: boolean | null;
  create_ts?: string | null;
  creator?: string | null;
  data?: string | null;
  directly_fillable?: boolean | null;
  expire_ts?: string | null;
  expired?: boolean | null;
  filled?: boolean | null;
  exchangeId?: string | null;
  is_offer?: boolean | null;
  order_type?: string | null;
  /** @format double */
  pair_fixed_fee?: number;
  /** @format double */
  pair_micro_percentage_fee?: number;
  pair_trezor?: string | null;
  pair_trezor_ledger_id?: string | null;
  parent_direct_order_id?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  remaining_quantity?: number;
  slippage?: string | null;
  trezor_stash_id?: string | null;
  fillStatus?: FillStatus;
  /** @format int32 */
  quoteTokenDecimal?: number;
  operationStatus?: OperationStatus;
  orderHistories?: LocalOrderHistoryListDto[] | null;
  userExchangeTransactions?: UserExchangeTransactionOutput[] | null;
}

export interface GetForViewLocalTradeDto {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int32 */
  pairId?: number | null;
  /** @format int32 */
  quoteTokenDecimal?: number;
  /** @format int32 */
  baseTokenDecimal?: number;
  rawData?: string | null;
  wallet?: string | null;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  order?: LocalOrderListDto;
  /** @format int64 */
  orderId?: number | null;
  emailSent?: boolean;
  kytTransactionSubmitd?: boolean;
  systemLog?: string | null;
  /** @format double */
  fee?: number;
  buy?: boolean | null;
  creator?: string | null;
  data?: string | null;
  dataAbi?: string | null;
  exchangeId?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int64 */
  timestamp?: number;
  trade_type?: string | null;
  /** @format double */
  volume?: number;
  /** @format double */
  fee_Broker?: number;
  /** @format double */
  fee_CSD?: number;
  /** @format double */
  fee_Exchange?: number;
}

export interface GetForViewRabbitExchangeOrderResponseDto {
  /** @format int64 */
  id?: number;
  orderEventType?: OrderEventType;
  rawData?: string | null;
  /** @format int64 */
  localOrderId?: number | null;
  /** @format date-time */
  creationTime?: string;
  data?: DeserializeExchnageOrderResponseForView;
}

export interface GetForViewRabbitExchangeTradeResponseDto {
  /** @format int64 */
  id?: number;
  rawData?: string | null;
  data?: DeserializeExchangeTradeResponseForView;
}

export interface GetForViewUserExchangeTransactionDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  userId?: number;
  user?: GetUserDto;
  requestDataRaw?: string | null;
  resultDataRaw?: string | null;
  receiptDataRaw?: string | null;
  status?: UserExchangeTransactionStatus;
  hash?: string | null;
  amount?: string | null;
  wallet?: string | null;
  comment?: string | null;
  type?: UserExchangeTransactionType;
  /** @format int64 */
  orderId?: number | null;
}

export interface GetGeneralStatsOutput {
  /** @format int32 */
  transactionPercent?: number;
  /** @format int32 */
  newVisitPercent?: number;
  /** @format int32 */
  bouncePercent?: number;
}

export interface GetIncomeStatisticsDataOutput {
  incomeStatistics?: IncomeStastistic[] | null;
}

export interface GetLanguageForEditOutput {
  language?: ApplicationLanguageEditDto;
  languageNames?: ComboboxItemDto[] | null;
  flags?: ComboboxItemDto[] | null;
}

export interface GetLanguagesOutput {
  items?: ApplicationLanguageListDto[] | null;
  defaultLanguageName?: string | null;
}

export interface GetLatestWebLogsOutput {
  latestWebLogLines?: string[] | null;
}

export interface GetLocalOrderHistoryForViewDto {
  /** @format int64 */
  id?: number;
  type?: OrderEventType;
  /** @format double */
  amount?: number | null;
  order?: GetForViewLocalOrderDto;
  rabbitExchangeOrderResponse?: RabbitExchangeOrderResponseDto;
  /** @format date-time */
  exchangeTimeStamp?: string | null;
}

export interface GetMemberActivityOutput {
  memberActivities?: MemberActivity[] | null;
}

export interface GetMiFIDTestAnswerDetailOutput {
  /** @format int32 */
  id?: number;
  title?: string | null;
  /** @format int32 */
  position?: number;
  /** @format int32 */
  score?: number;
}

export interface GetMiFIDTestDetailOutput {
  /** @format int32 */
  id?: number;
  name?: string | null;
  warningMessage?: string | null;
  miFIDTestQuestions?: GetMiFIDTestQuestionDetailOutput[] | null;
}

export interface GetMiFIDTestQuestionDetailOutput {
  /** @format int32 */
  id?: number;
  title?: string | null;
  /** @format int32 */
  position?: number;
  miFIDTestAnswers?: GetMiFIDTestAnswerDetailOutput[] | null;
}

export interface GetNotificationSettingsOutput {
  receiveNotifications?: boolean;
  notifications?: NotificationSubscriptionWithDisplayNameDto[] | null;
}

export interface GetNotificationsCreatedByUserOutput {
  notificationName?: string | null;
  data?: string | null;
  dataTypeName?: string | null;
  severity?: NotificationSeverity;
  isPublished?: boolean;
  /** @format date-time */
  creationTime?: string;
}

export interface GetNotificationsOutput {
  items?: UserNotification[] | null;
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  unreadCount?: number;
}

export interface GetOpenOrdersDto {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  isBuy?: boolean;
  /** @format date-time */
  expire_ts?: string | null;
  fillStatus?: FillStatus;
  price?: string | null;
  quantity?: string | null;
  remaining_quantity?: string | null;
  pairSymbol?: string | null;
  operationStatus?: OperationStatus;
}

export interface GetOrderDetailOutput {
  /** @format int64 */
  id?: number;
  pairSymbol?: string | null;
  logoAddress?: string | null;
  /** @format date-time */
  dateOfOrder?: string | null;
  isBuy?: boolean;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  percentageComplete?: number;
  orderType?: string | null;
  commission?: string | null;
  status?: OrderActivityStatus;
}

export interface GetOrderTradesOutput {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  /** @format double */
  price?: number;
  /** @format double */
  volume?: number;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  totalFee?: number;
}

export interface GetOrderbookOutput {
  bid?: boolean | null;
  cancelled?: boolean | null;
  create_ts?: string | null;
  creator?: string | null;
  data?: string | null;
  directly_fillable?: boolean | null;
  expire_ts?: string | null;
  expired?: boolean | null;
  filled?: boolean | null;
  id?: string | null;
  is_offer?: boolean | null;
  offer_ids?: string[] | null;
  order_type?: string | null;
  pair_fixed_fee?: string | null;
  pair_micro_percentage_fee?: string | null;
  pair_trezor?: string | null;
  pair_trezor_ledger_id?: string | null;
  parent_direct_order_id?: string | null;
  price?: string | null;
  quantity?: string | null;
  remaining_quantity?: string | null;
  slippage?: string | null;
  trezor_stash_id?: string | null;
  pair_id?: string | null;
  orderbook?: string | null;
  chainId?: string | null;
}

export interface GetOrderbookPairOrdersResponse {
  orders?: Order[] | null;
}

export interface GetOrderbookPairsResponse {
  pairs?: PairInfo[] | null;
}

export interface GetOrderbooksResponse {
  orderbooks?: ContractDeployment[] | null;
}

export interface GetOrdersOutput {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
  isBuy?: boolean | null;
  side?: ExchangeOrderType;
  pairSymbol?: string | null;
  logoAddress?: string | null;
  status?: OrderActivityStatus;
}

export interface GetPairTradesOutput {
  ask_order_id?: string | null;
  bid_order_id?: string | null;
  buy?: boolean | null;
  id?: string | null;
  price?: string | null;
  quantity?: string | null;
  timestamp?: string | null;
  volume?: string | null;
  pair_id?: string | null;
  orderbook?: string | null;
  chainId?: string | null;
  ask_fee?: string | null;
  creator?: string | null;
  data?: string | null;
  dataAbi?: string | null;
  trade_type?: string | null;
  bid_fee?: string | null;
}

export interface GetPasswordComplexitySettingOutput {
  setting?: PasswordComplexitySetting;
}

export interface GetPortfolioAssetsOutput {
  exchangePairId?: string | null;
  orderbook?: string | null;
  chainId?: string | null;
  baseTokenAddress?: string | null;
  userErc20Address?: string | null;
  symbol?: string | null;
  title?: string | null;
  logoAddress?: string | null;
  coverAddress?: string | null;
  /** @format int32 */
  decimal?: number;
  total?: string | null;
  available?: string | null;
  inOrder?: string | null;
  lastPrice?: string | null;
  highPrice?: string | null;
  lowPrice?: string | null;
  volume?: string | null;
  /** @format int32 */
  quoteTokenDecimal?: number;
  open?: string | null;
  close?: string | null;
}

export interface GetProfilePictureOutput {
  profilePicture?: string | null;
}

export interface GetProfitShareOutput {
  profitShares?: number[] | null;
}

export interface GetPublishedNotificationsOutput {
  items?: GetNotificationsCreatedByUserOutput[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface GetRecentTenantsOutput {
  /** @format int32 */
  recentTenantsDayCount?: number;
  /** @format int32 */
  maxRecentTenantsShownCount?: number;
  /** @format date-time */
  tenantCreationStartDate?: string;
  recentTenants?: RecentTenant[] | null;
}

export interface GetRegionalStatsOutput {
  stats?: RegionalStatCountry[] | null;
}

export interface GetRoleForEditOutput {
  role?: RoleEditDto;
  permissions?: FlatPermissionDto[] | null;
  grantedPermissionNames?: string[] | null;
}

export interface GetRolesInput {
  permissions?: string[] | null;
}

export interface GetSalesSummaryOutput {
  /** @format int32 */
  totalSales?: number;
  /** @format int32 */
  revenue?: number;
  /** @format int32 */
  expenses?: number;
  /** @format int32 */
  growth?: number;
  salesSummary?: SalesSummaryData[] | null;
}

export interface GetSingleNewsOutputDto {
  /** @format int32 */
  id?: number;
  header?: string | null;
  miniDescription?: string | null;
  description?: string | null;
  slug?: string | null;
  coverImage?: string | null;
  thumbnailImage?: string | null;
  /** @format date-time */
  creationTime?: string;
}

export interface GetSystemUserExistsOutput {
  message?: string | null;
  exist?: boolean;
}

export interface GetTenantFeaturesEditOutput {
  featureValues?: NameValueDto[] | null;
  features?: FlatFeatureDto[] | null;
}

export interface GetTopStatsOutput {
  /** @format int32 */
  totalProfit?: number;
  /** @format int32 */
  newFeedbacks?: number;
  /** @format int32 */
  newOrders?: number;
  /** @format int32 */
  newUsers?: number;
}

export interface GetTradesOutput {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  /** @format double */
  price?: number;
  /** @format double */
  volume?: number;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  totalFee?: number;
  pairSymbol?: string | null;
  logoAddress?: string | null;
  /** @format date-time */
  orderExpiry?: string | null;
  isBuy?: boolean | null;
  side?: ExchangeOrderType;
  /** @format int64 */
  orderId?: number | null;
}

export interface GetUserChatFriendsWithSettingsOutput {
  /** @format date-time */
  serverTime?: string;
  friends?: FriendDto[] | null;
}

export interface GetUserDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  surname?: string | null;
  fullName?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  /** @format date-time */
  lockoutEndDateUtc?: string | null;
  phoneNumber?: string | null;
  /** @format uuid */
  profilePictureId?: string | null;
  isEmailConfirmed?: boolean;
  /** @format uuid */
  guid?: string;
  isActive?: boolean;
  kycStatus?: UserKYCStatus;
  investorType?: InvestorType;
  status?: UserStatus;
  riskLevel?: UserRiskLevel;
  verifiedLevel?: KycType;
  /** @format date-time */
  creationTime?: string;
  referenceId?: string | null;
  systemUser?: SystemUser;
}

export interface GetUserForEditOutput {
  /** @format uuid */
  profilePictureId?: string | null;
  user?: UserEditDto;
  roles?: UserRoleDto[] | null;
  allOrganizationUnits?: OrganizationUnitDto[] | null;
  memberedOrganizationUnits?: string[] | null;
  allowedUserNameCharacters?: string | null;
  isSMTPSettingsProvided?: boolean;
}

export interface GetUserOrdersHistoryDto {
  type?: OrderEventType;
  amount?: string | null;
  /** @format date-time */
  exchangeTimeStamp?: string | null;
  isBuy?: boolean;
  price?: string | null;
  quantity?: string | null;
  pairSymbol?: string | null;
  operationStatus?: OperationStatus;
  fillStatus?: FillStatus;
}

export interface GetUserPermissionsForEditOutput {
  permissions?: FlatPermissionDto[] | null;
  grantedPermissionNames?: string[] | null;
}

export interface GetUsersInput {
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  maxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  skipCount?: number;
  sorting?: string | null;
  filter?: string | null;
  permissions?: string[] | null;
  /** @format int32 */
  role?: number | null;
  onlyLockedUsers?: boolean;
}

export interface GoogleExternalLoginProviderSettings {
  clientId?: string | null;
  clientSecret?: string | null;
  userInfoEndpoint?: string | null;
}

export interface HostBillingSettingsEditDto {
  legalName?: string | null;
  address?: string | null;
}

export interface HostSettingsEditDto {
  general: GeneralSettingsEditDto;
  userManagement: HostUserManagementSettingsEditDto;
  email: EmailSettingsEditDto;
  tenantManagement: TenantManagementSettingsEditDto;
  security: SecuritySettingsEditDto;
  billing?: HostBillingSettingsEditDto;
  otherSettings?: OtherSettingsEditDto;
  externalLoginProviderSettings?: ExternalLoginProviderSettingsEditDto;
}

export interface HostUserManagementSettingsEditDto {
  isEmailConfirmationRequiredForLogin?: boolean;
  smsVerificationEnabled?: boolean;
  isCookieConsentEnabled?: boolean;
  isQuickThemeSelectEnabled?: boolean;
  useCaptchaOnLogin?: boolean;
  allowUsingGravatarProfilePicture?: boolean;
  sessionTimeOutSettings?: SessionTimeOutSettingsEditDto;
  userPasswordSettings?: UserPasswordSettingsEditDto;
}

export type ICustomAttributeProvider = object;

export interface IInputType {
  name?: string | null;
  attributes?: Record<string, any>;
  validator?: IValueValidator;
}

export interface IValueValidator {
  name?: string | null;
  attributes?: Record<string, any>;
}

export interface IdTitleDto {
  /** @format int32 */
  id?: number;
  title?: string | null;
  selected?: boolean;
}

export interface ImpersonateOutput {
  impersonationToken?: string | null;
  tenancyName?: string | null;
}

export interface ImpersonateTenantInput {
  /** @format int32 */
  tenantId?: number | null;
  /**
   * @format int64
   * @min 1
   */
  userId?: number;
}

export interface ImpersonateUserInput {
  /** @format int32 */
  tenantId?: number | null;
  /**
   * @format int64
   * @min 1
   */
  userId?: number;
}

export interface ImpersonatedAuthenticateResultModel {
  accessToken?: string | null;
  encryptedAccessToken?: string | null;
  /** @format int32 */
  expireInSeconds?: number;
}

export interface IncomeStastistic {
  label?: string | null;
  /** @format date-time */
  date?: string;
  /** @format double */
  amount?: number;
}

export interface InsertOrUpdateAllValuesInput {
  items?: InsertOrUpdateAllValuesInputItem[] | null;
}

export interface InsertOrUpdateAllValuesInputItem {
  entityId?: string | null;
  /** @format int32 */
  dynamicEntityPropertyId?: number;
  values?: string[] | null;
}

export interface InstallDto {
  /** @minLength 1 */
  connectionString: string;
  /** @minLength 1 */
  adminPassword: string;
  /** @minLength 1 */
  webSiteUrl: string;
  serverUrl?: string | null;
  /** @minLength 1 */
  defaultLanguage: string;
  smtpSettings?: EmailSettingsEditDto;
  billInfo?: HostBillingSettingsEditDto;
}

/** @format int32 */
export type Int32 = number;

/** @format int64 */
export type Int64 = number;

export type IntPtr = object;

export interface InvestorCategorisation {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /** @format int64 */
  userId?: number;
  user?: User;
  lastIncomeMoreThan150K?: boolean | null;
  incomeType?: IncomeType;
  netAssetMoreThan300K?: boolean | null;
  /** @format double */
  netAssetLastYear?: number | null;
  /** @format double */
  expectedInvestment?: number | null;
  investingExperience?: InvestingExperience;
  understanigRisk?: boolean;
}

export interface InvestorCategorisationInputDto {
  investorType?: InvestorType;
  lastIncomeMoreThan150K?: boolean | null;
  incomeType?: IncomeType;
  netAssetMoreThan300K?: boolean | null;
  /** @format double */
  netAssetLastYear?: number | null;
  /** @format double */
  expectedInvestment?: number | null;
  investingExperience?: InvestingExperience;
  understanigRisk?: boolean;
}

export interface InvestorCategorisationOutput {
  /** @format int64 */
  id?: number;
  lastIncomeMoreThan150K?: boolean | null;
  incomeType?: IncomeType;
  netAssetMoreThan300K?: boolean;
  /** @format double */
  netAssetLastYear?: number | null;
  /** @format double */
  expectedInvestment?: number;
  investingExperience?: InvestingExperience;
  understanigRisk?: boolean;
}

export interface InvestorCategorisationResultDto {
  isSuccess?: boolean;
  message?: string | null;
  nextStep?: FlowStep;
}

export interface InvestorsStatisticsOutput {
  /** @format int64 */
  total?: number;
  /** @format int64 */
  underReview?: number;
  /** @format int64 */
  disable?: number;
  /** @format int64 */
  active?: number;
}

export interface InvoiceDto {
  items?: SubscriptionPaymentProductDto[] | null;
  /** @format double */
  totalAmount?: number;
  invoiceNo?: string | null;
  /** @format date-time */
  invoiceDate?: string;
  tenantLegalName?: string | null;
  tenantAddress?: string[] | null;
  tenantTaxNo?: string | null;
  hostLegalName?: string | null;
  hostAddress?: string[] | null;
}

export interface IsTenantAvailableInput {
  /**
   * @minLength 1
   * @maxLength 64
   */
  tenancyName: string;
}

export interface IsTenantAvailableOutput {
  state?: TenantAvailabilityState;
  /** @format int32 */
  tenantId?: number | null;
  serverRootAddress?: string | null;
}

export interface JsonClaimMapDto {
  claim?: string | null;
  key?: string | null;
}

export interface KycRecordDto {
  /** @format int64 */
  id?: number;
  identityVerificationProvider?: IdentityVerificationProvider;
  providerTokenObject?: string | null;
  providerResult?: string | null;
  providerApplicantId?: string | null;
  runId?: string | null;
  error?: string | null;
  reviewStatus?: ReviewStatus;
  kycProccessStatus?: KycProccessStatus;
  resultParameters?: KycRecordResultParameterDto[] | null;
}

export interface KycRecordResultParameterDto {
  type?: ParameterType;
  parameter?: string | null;
  value?: string | null;
}

export interface LanguageTextListDto {
  key?: string | null;
  baseValue?: string | null;
  targetValue?: string | null;
}

export interface LdapSettingsEditDto {
  isModuleEnabled?: boolean;
  isEnabled?: boolean;
  domain?: string | null;
  userName?: string | null;
  password?: string | null;
  useSsl?: boolean;
}

export interface LedgerBalances {
  erc20s?: Record<string, Record<string, string>>;
  wei_balances?: Record<string, string>;
}

export interface LinkToUserInput {
  tenancyName?: string | null;
  /** @minLength 1 */
  usernameOrEmailAddress: string;
  /** @minLength 1 */
  password: string;
}

export interface LinkedUserDto {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  tenantId?: number | null;
  tenancyName?: string | null;
  username?: string | null;
}

export interface ListResultDtoOfCacheDto {
  items?: CacheDto[] | null;
}

export interface ListResultDtoOfChatMessageDto {
  items?: ChatMessageDto[] | null;
}

export interface ListResultDtoOfDynamicEntityPropertyDto {
  items?: DynamicEntityPropertyDto[] | null;
}

export interface ListResultDtoOfDynamicEntityPropertyValueDto {
  items?: DynamicEntityPropertyValueDto[] | null;
}

export interface ListResultDtoOfDynamicPropertyDto {
  items?: DynamicPropertyDto[] | null;
}

export interface ListResultDtoOfDynamicPropertyValueDto {
  items?: DynamicPropertyValueDto[] | null;
}

export interface ListResultDtoOfEditionListDto {
  items?: EditionListDto[] | null;
}

export interface ListResultDtoOfFlatPermissionWithLevelDto {
  items?: FlatPermissionWithLevelDto[] | null;
}

export interface ListResultDtoOfGetAllAvailableWebhooksOutput {
  items?: GetAllAvailableWebhooksOutput[] | null;
}

export interface ListResultDtoOfGetAllEntitiesHasDynamicPropertyOutput {
  items?: GetAllEntitiesHasDynamicPropertyOutput[] | null;
}

export interface ListResultDtoOfGetAllSendAttemptsOfWebhookEventOutput {
  items?: GetAllSendAttemptsOfWebhookEventOutput[] | null;
}

export interface ListResultDtoOfGetAllSubscriptionsOutput {
  items?: GetAllSubscriptionsOutput[] | null;
}

export interface ListResultDtoOfLinkedUserDto {
  items?: LinkedUserDto[] | null;
}

export interface ListResultDtoOfNameValueDto {
  items?: NameValueDto[] | null;
}

export interface ListResultDtoOfOrganizationUnitDto {
  items?: OrganizationUnitDto[] | null;
}

export interface ListResultDtoOfRoleListDto {
  items?: RoleListDto[] | null;
}

export interface ListResultDtoOfSubscribableEditionComboboxItemDto {
  items?: SubscribableEditionComboboxItemDto[] | null;
}

export interface LocalOrder {
  /** @format int64 */
  id?: number;
  /** @format double */
  userSelectedExpireTs?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  rawData?: string | null;
  alarm_abi?: string | null;
  alarm_data?: string | null;
  bid?: boolean | null;
  cancelled?: boolean | null;
  /** @format int64 */
  create_ts?: number;
  creator?: string | null;
  data?: string | null;
  directly_fillable?: boolean | null;
  /** @format int64 */
  expire_ts?: number | null;
  expired?: boolean | null;
  filled?: boolean | null;
  fillStatus?: FillStatus;
  operationStatus?: OperationStatus;
  exchangeId?: string | null;
  is_offer?: boolean | null;
  order_type?: string | null;
  /** @format double */
  pair_fixed_fee?: number;
  /** @format double */
  pair_micro_percentage_fee?: number;
  pair_trezor?: string | null;
  pair_trezor_ledger_id?: string | null;
  parent_direct_order_id?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  remaining_quantity?: number;
  slippage?: string | null;
  trezor_stash_id?: string | null;
  /** @format int64 */
  exchangeIdInt?: number;
  orderType?: OrderType;
  /** @format int32 */
  pairId?: number | null;
  pair?: Pair;
  creatorUser?: User;
  /** @format int64 */
  creatorUserId?: number | null;
  userExchangeTransactions?: UserExchangeTransaction[] | null;
  orderHistories?: LocalOrderHistory[] | null;
  trades?: LocalTrade[] | null;
}

export interface LocalOrderHistory {
  /** @format int64 */
  id?: number;
  type?: OrderEventType;
  /** @format double */
  amount?: number | null;
  /** @format int64 */
  orderId?: number;
  order?: LocalOrder;
  /** @format int64 */
  rabbitExchangeResponseId?: number;
  rabbitExchangeOrderResponse?: RabbitExchangeOrderResponse;
  /** @format date-time */
  exchangeTimeStamp?: string | null;
}

export interface LocalOrderHistoryListDto {
  /** @format int64 */
  id?: number;
  eventType?: OrderEventType;
  orderType?: string | null;
  amount?: string | null;
  digitalSecurity?: string | null;
  /** @format int64 */
  orderId?: number;
  /** @format int64 */
  exchangeId?: number;
  bid?: boolean | null;
  creatorUser?: BaseUserDto;
  creator?: string | null;
  pairName?: string | null;
  price?: string | null;
  /** @format int32 */
  quantity?: number;
  cancelled?: boolean | null;
  expired?: boolean | null;
  filled?: boolean | null;
  fillStatus?: FillStatus;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  /** @format date-time */
  parsed_Expire_ts?: string | null;
  /** @format int32 */
  pairId?: number | null;
  /** @format date-time */
  exchangeTimeStamp?: string | null;
}

export interface LocalOrderListDto {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  pairId?: number | null;
  exchangeId?: string | null;
  digitalSecurity?: string | null;
  alarm_abi?: string | null;
  alarm_data?: string | null;
  bid?: boolean | null;
  creatorUser?: BaseUserDto;
  creator?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  remaining_quantity?: number;
  /** @format int64 */
  create_ts?: number;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  /** @format date-time */
  parsed_Expire_ts?: string | null;
  cancelled?: boolean | null;
  expired?: boolean | null;
  filled?: boolean | null;
  fillStatus?: FillStatus;
  /** @format double */
  pair_fixed_fee?: number;
  /** @format double */
  pair_micro_percentage_fee?: number;
  price_Readable?: string | null;
  /** @format double */
  numericPrice?: number;
  order_type?: string | null;
  operationStatus?: OperationStatus;
}

export interface LocalTrade {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int32 */
  pairId?: number | null;
  pair?: Pair;
  rawData?: string | null;
  /** @format int64 */
  orderId?: number | null;
  order?: LocalOrder;
  exchangeAskOrderId?: string | null;
  exchangeBidOrderId?: string | null;
  systemLog?: string | null;
  /** @format date-time */
  parsed_Create_ts?: string | null;
  /** @format double */
  fee?: number;
  buy?: boolean;
  data?: string | null;
  dataAbi?: string | null;
  exchangeId?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int64 */
  timestamp?: number;
  trade_type?: string | null;
  /** @format double */
  volume?: number;
  /** @format double */
  fee_Broker?: number;
  /** @format double */
  fee_CSD?: number;
  /** @format double */
  fee_Exchange?: number;
}

export interface LocalTradeListDto {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int32 */
  pairId?: number | null;
  wallet?: string | null;
  /** @format int32 */
  quoteTokenDecimal?: number;
  order?: LocalOrderListDto;
  /** @format int64 */
  orderId?: number | null;
  emailSent?: boolean;
  kytTransactionSubmitd?: boolean;
  systemLog?: string | null;
  buy?: boolean | null;
  creator?: string | null;
  data?: string | null;
  dataAbi?: string | null;
  exchangeId?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
  timestamp?: string | null;
  trade_type?: string | null;
  volume?: string | null;
  totalFee?: string | null;
  price_Readable?: string | null;
  /** @format date-time */
  parsed_Create_ts?: string | null;
}

export interface LocalizableComboboxItemDto {
  value?: string | null;
  displayText?: string | null;
}

export interface LocalizableComboboxItemSourceDto {
  items?: LocalizableComboboxItemDto[] | null;
}

export interface MarkAllUnreadMessagesOfUserAsReadInput {
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  userId?: number;
}

export interface MassNotificationOrganizationUnitLookupTableDto {
  /** @format int64 */
  id?: number;
  displayName?: string | null;
}

export interface MassNotificationUserLookupTableDto {
  /** @format int64 */
  id?: number;
  displayName?: string | null;
}

export interface MemberActivity {
  name?: string | null;
  earnings?: string | null;
  /** @format int32 */
  cases?: number;
  /** @format int32 */
  closed?: number;
  rate?: string | null;
  profilePictureName?: string | null;
}

export interface MemberInfo {
  memberType?: MemberTypes;
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
}

export interface MethodBase {
  memberType?: MemberTypes;
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
}

export interface MethodInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  memberType?: MemberTypes;
  returnParameter?: ParameterInfo;
  returnType?: Type;
  returnTypeCustomAttributes?: ICustomAttributeProvider;
}

export interface MiFIDTest {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  name?: string | null;
  warningMessage?: string | null;
  pairs?: Pair[] | null;
  miFIDTestQuestions?: MiFIDTestQuestion[] | null;
}

export interface MiFIDTestAnswer {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  title?: string | null;
  /** @format int32 */
  position?: number;
  /** @format float */
  score?: number;
  /** @format int32 */
  miFIDTestQuestionId?: number;
  miFIDTestQuestion?: MiFIDTestQuestion;
}

export interface MiFIDTestAnswerDto {
  /** @format int32 */
  id?: number;
  title?: string | null;
  /** @format float */
  score?: number;
  /** @format int32 */
  position?: number;
}

export interface MiFIDTestAnswerEditDto {
  /** @format int32 */
  id?: number;
  title?: string | null;
  /** @format float */
  score?: number;
  /** @format int32 */
  position?: number;
  /** @format int32 */
  miFIDTestQuestionId?: number;
  isEditMode?: boolean;
}

export interface MiFIDTestAnswerWithoutScoreDto {
  /** @format int32 */
  id?: number;
  title?: string | null;
}

export interface MiFIDTestDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  warningMessage?: string | null;
  /** @format int32 */
  questionsCount?: number;
}

export interface MiFIDTestEditDto {
  /** @format int32 */
  id?: number | null;
  name?: string | null;
  warningMessage?: string | null;
}

export interface MiFIDTestQuestion {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  title?: string | null;
  /** @format int32 */
  position?: number;
  /** @format int32 */
  miFIDTestId?: number;
  miFIDTest?: MiFIDTest;
  miFIDTestAnswers?: MiFIDTestAnswer[] | null;
}

export interface MiFIDTestQuestionDto {
  /** @format int32 */
  id?: number;
  title?: string | null;
  /** @format int32 */
  position?: number;
}

export interface MiFIDTestQuestionEditDto {
  /** @format int32 */
  id?: number;
  title?: string | null;
  /** @format int32 */
  position?: number;
  /** @format int32 */
  miFIDTestId?: number;
  isEditMode?: boolean;
}

export interface MiFIDTestQuestionWithoutScoreDto {
  /** @format int32 */
  id?: number;
  title?: string | null;
  miFIDTestAnswers?: MiFIDTestAnswerWithoutScoreDto[] | null;
}

export interface MiFIDTestWithoutScoreDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  warningMessage?: string | null;
  miFIDTestQuestions?: MiFIDTestQuestionWithoutScoreDto[] | null;
}

export interface MicrosoftExternalLoginProviderSettings {
  clientId?: string | null;
  clientSecret?: string | null;
}

export interface Module {
  assembly?: Assembly;
  fullyQualifiedName?: string | null;
  name?: string | null;
  /** @format int32 */
  mdStreamVersion?: number;
  /** @format uuid */
  moduleVersionId?: string;
  scopeName?: string | null;
  moduleHandle?: ModuleHandle;
  customAttributes?: CustomAttributeData[] | null;
  /** @format int32 */
  metadataToken?: number;
}

export interface ModuleHandle {
  /** @format int32 */
  mdStreamVersion?: number;
}

export interface MoveOrganizationUnitInput {
  /**
   * @format int64
   * @min 1
   */
  id?: number;
  /** @format int64 */
  newParentId?: number | null;
}

export interface MoveTenantsToAnotherEditionDto {
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  sourceEditionId?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  targetEditionId?: number;
}

export interface NameValue {
  name?: string | null;
  value?: string | null;
}

export interface NameValueDto {
  name?: string | null;
  value?: string | null;
}

export interface NameValueOfString {
  name?: string | null;
  value?: string | null;
}

export interface NewDepositDto {
  /** @format double */
  amount?: number;
}

export interface News {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  header?: string | null;
  miniDescription?: string | null;
  description?: string | null;
  slug?: string | null;
  coverImage?: string | null;
  thumbnailImage?: string | null;
  accessibility?: NewsAccessibility;
  /** @format int32 */
  pairId?: number | null;
  pair?: Pair;
  isPublished?: boolean;
  descriptionDraft?: string | null;
}

export interface NewsDto {
  header?: string | null;
  miniDescription?: string | null;
  description?: string | null;
  slug?: string | null;
  coverImage?: string | null;
  thumbnailImage?: string | null;
  accessibility?: NewsAccessibility;
  isPublished?: boolean;
  descriptionDraft?: string | null;
}

export interface NewsListDto {
  /** @format int32 */
  id?: number;
  header?: string | null;
  miniDescription?: string | null;
  slug?: string | null;
  thumbnailImage?: string | null;
  /** @format date-time */
  creationTime?: string;
}

export interface NotificationData {
  type?: string | null;
  properties?: Record<string, any>;
}

export interface NotificationSubscriptionDto {
  /**
   * @minLength 1
   * @maxLength 96
   */
  name: string;
  isSubscribed?: boolean;
}

export interface NotificationSubscriptionWithDisplayNameDto {
  /**
   * @minLength 1
   * @maxLength 96
   */
  name: string;
  isSubscribed?: boolean;
  displayName?: string | null;
  description?: string | null;
}

export type Nullable1 = FillStatus;

export interface Ohlc {
  close?: string | null;
  high?: string | null;
  low?: string | null;
  open?: string | null;
  /** @format int32 */
  timestamp?: number | null;
  volume?: string | null;
}

export interface OpenIdConnectExternalLoginProviderSettings {
  clientId?: string | null;
  clientSecret?: string | null;
  authority?: string | null;
  loginUrl?: string | null;
  validateIssuer?: boolean;
  responseType?: string | null;
}

export interface Order {
  alarm_abi?: string | null;
  alarm_data?: string | null;
  bid?: boolean | null;
  cancelled?: boolean | null;
  create_ts?: string | null;
  creator?: string | null;
  data?: string | null;
  directly_fillable?: boolean | null;
  expire_ts?: string | null;
  expired?: boolean | null;
  filled?: boolean | null;
  id?: string | null;
  is_offer?: boolean | null;
  offer_ids?: string[] | null;
  order_type?: string | null;
  pair_fixed_fee?: string | null;
  pair_micro_percentage_fee?: string | null;
  pair_trezor?: string | null;
  pair_trezor_ledger_id?: string | null;
  parent_direct_order_id?: string | null;
  price?: string | null;
  quantity?: string | null;
  remaining_quantity?: string | null;
  slippage?: string | null;
  trezor_stash_id?: string | null;
}

export interface OrganizationUnitDto {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  /** @format int64 */
  parentId?: number | null;
  code?: string | null;
  displayName?: string | null;
  /** @format int32 */
  memberCount?: number;
  /** @format int32 */
  roleCount?: number;
}

export interface OrganizationUnitRoleListDto {
  /** @format int64 */
  id?: number;
  displayName?: string | null;
  name?: string | null;
  /** @format date-time */
  addedTime?: string;
}

export interface OrganizationUnitUserListDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  surname?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  /** @format uuid */
  profilePictureId?: string | null;
  /** @format date-time */
  addedTime?: string;
}

export interface OtherSettingsEditDto {
  isQuickThemeSelectEnabled?: boolean;
}

export interface Owner {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  name?: string | null;
  pairs?: Pair[] | null;
}

export interface OwnerDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
}

export interface OwnerEditDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
}

export interface Page {
  id?: string | null;
  name?: string | null;
  widgets?: Widget[] | null;
}

export interface PagedResultDtoOfAccountNameListDto {
  items?: AccountNameListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfAssetBalanceListDto {
  items?: AssetBalanceListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfAuditLogListDto {
  items?: AuditLogListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfBalanceListDto {
  items?: BalanceListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfBaseUserDto {
  items?: BaseUserDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfCashBalanceListDto {
  items?: CashBalanceListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfCashPostingListDto {
  items?: CashPostingListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfCategoryDto {
  items?: CategoryDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfDashboardDefListDto {
  items?: DashboardDefListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfDebitAndCreditListDto {
  items?: DebitAndCreditListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfEntityChangeListDto {
  items?: EntityChangeListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfFeeCalculationListDto {
  items?: FeeCalculationListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfFindOrganizationUnitUsersOutputDto {
  items?: FindOrganizationUnitUsersOutputDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfFindUsersOutputDto {
  items?: FindUsersOutputDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfGetAllNewsDto {
  items?: GetAllNewsDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfGetAllSendAttemptsOutput {
  items?: GetAllSendAttemptsOutput[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfGetOpenOrdersDto {
  items?: GetOpenOrdersDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfGetOrderTradesOutput {
  items?: GetOrderTradesOutput[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfGetOrderbookOutput {
  items?: GetOrderbookOutput[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfGetOrdersOutput {
  items?: GetOrdersOutput[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfGetPairTradesOutput {
  items?: GetPairTradesOutput[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfGetTradesOutput {
  items?: GetTradesOutput[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfGetUserOrdersHistoryDto {
  items?: GetUserOrdersHistoryDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfLanguageTextListDto {
  items?: LanguageTextListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfLinkedUserDto {
  items?: LinkedUserDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfLocalOrderHistoryListDto {
  items?: LocalOrderHistoryListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfLocalOrderListDto {
  items?: LocalOrderListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfLocalTradeListDto {
  items?: LocalTradeListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfMassNotificationOrganizationUnitLookupTableDto {
  items?: MassNotificationOrganizationUnitLookupTableDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfMassNotificationUserLookupTableDto {
  items?: MassNotificationUserLookupTableDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfMiFIDTestAnswerDto {
  items?: MiFIDTestAnswerDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfMiFIDTestDto {
  items?: MiFIDTestDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfMiFIDTestQuestionDto {
  items?: MiFIDTestQuestionDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfNameValueDto {
  items?: NameValueDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfNewsListDto {
  items?: NewsListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfOrganizationUnitRoleListDto {
  items?: OrganizationUnitRoleListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfOrganizationUnitUserListDto {
  items?: OrganizationUnitUserListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfOwnerDto {
  items?: OwnerDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfPairDocumentListDto {
  items?: PairDocumentListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfPairListDto {
  items?: PairListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfPairPerkListDto {
  items?: PairPerkListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfPairUIKeyValueListDto {
  items?: PairUIKeyValueListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfRabbitExchangeOrderResponseListDto {
  items?: RabbitExchangeOrderResponseListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfRabbitExchangeTradeResponseListDto {
  items?: RabbitExchangeTradeResponseListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfStaticPageListDto {
  items?: StaticPageListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfSubscriptionPaymentListDto {
  items?: SubscriptionPaymentListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfTenantListDto {
  items?: TenantListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfTopUpTransactionListDto {
  items?: TopUpTransactionListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserBalanceActivityDto {
  items?: UserBalanceActivityDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserDelegationDto {
  items?: UserDelegationDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserExchangeTransactionListDto {
  items?: any[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserInformationListDto {
  items?: UserInformationListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserIssueListDto {
  items?: UserIssueListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserKycAttemptListDto {
  items?: UserKycAttemptListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserKycAttemptOutput {
  items?: UserKycAttemptOutput[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserKycAttemptResult {
  items?: UserKycAttemptResult[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserListDto {
  items?: UserListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfUserLoginAttemptDto {
  items?: UserLoginAttemptDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface PagedResultDtoOfWithdrawTranasactionListDto {
  items?: WithdrawTranasactionListDto[] | null;
  /** @format int32 */
  totalCount?: number;
}

export interface Pair {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /** @format int32 */
  quoteTokenDecimal?: number;
  /** @format int32 */
  baseTokenDecimal?: number;
  exchangePairId?: string | null;
  orderbook?: string | null;
  chainId?: string | null;
  baseTokenAddress?: string | null;
  quoteTokenAddress?: string | null;
  trezorAddress?: string | null;
  symbol?: string | null;
  baseTokenSymbol?: string | null;
  quoteTokenSymbol?: string | null;
  /** @format double */
  pairFixedFee?: number;
  /** @format double */
  pairMicroPercentageFee?: number;
  logoAddress?: string | null;
  coverAddress?: string | null;
  isActive?: boolean;
  title?: string | null;
  description?: string | null;
  descriptionBody?: string | null;
  owner?: Owner;
  /** @format int32 */
  ownerId?: number | null;
  /** @format int32 */
  miFIDTestId?: number | null;
  stockName?: string | null;
  stockDetails?: string | null;
  test?: MiFIDTest;
  uiKeyValues?: PairUIKeyValue[] | null;
  categories?: PairCategory[] | null;
  documents?: PairDocument[] | null;
  news?: News[] | null;
  perks?: PairPerk[] | null;
  localOrders?: LocalOrder[] | null;
  localTrades?: LocalTrade[] | null;
}

export interface PairCategory {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  pairId?: number;
  pair?: Pair;
  /** @format int32 */
  categoryId?: number;
  category?: Category;
}

export interface PairDocument {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  url?: string | null;
  title?: string | null;
  isExternal?: boolean;
  /** @format int32 */
  pairId?: number;
  pair?: Pair;
}

export interface PairDocumentDto {
  url?: string | null;
  title?: string | null;
}

export interface PairDocumentListDto {
  /** @format int32 */
  id?: number;
  url?: string | null;
  title?: string | null;
}

export interface PairDto {
  /** @format int32 */
  quoteTokenDecimal?: number;
  /** @format int32 */
  baseTokenDecimal?: number;
  exchangePairId?: string | null;
  orderbook?: string | null;
  chainId?: string | null;
  baseTokenAddress?: string | null;
  quoteTokenAddress?: string | null;
  trezorAddress?: string | null;
  symbol?: string | null;
  baseTokenSymbol?: string | null;
  quoteTokenSymbol?: string | null;
  logoAddress?: string | null;
  coverAddress?: string | null;
  title?: string | null;
  description?: string | null;
  descriptionBody?: string | null;
  /** @format int32 */
  miFIDTestId?: number | null;
  owner?: OwnerDto;
  /** @format int32 */
  ownerId?: number;
  uiKeyValues?: PairUIKeyValueDto[] | null;
  categories?: CategoryDto[] | null;
  documents?: PairDocumentDto[] | null;
  news?: NewsDto[] | null;
  perks?: PairPerkDto[] | null;
  last_trade_price?: string | null;
}

export interface PairInfo {
  active?: boolean | null;
  auto_match?: boolean | null;
  base_token?: TokenInfo;
  /** @format int32 */
  close_hour?: number | null;
  data?: string | null;
  fee_collector?: string | null;
  fixed_fee?: string | null;
  id?: string | null;
  last_accepted_offer_price?: string | null;
  last_match_price?: string | null;
  last_straight_fill_price?: string | null;
  last_trade_id?: string | null;
  last_trade_price?: string | null;
  marker?: string | null;
  micro_percentage_fee?: string | null;
  min_order_volume?: string | null;
  nr_of_orders?: string | null;
  nr_of_trades?: string | null;
  /** @format int32 */
  open_hour?: number | null;
  quote_token?: TokenInfo;
  trezor?: string | null;
  trezor_ledger_id?: string | null;
}

export interface PairListDto {
  /** @format int32 */
  id?: number;
  symbol?: string | null;
  baseTokenSymbol?: string | null;
  quoteTokenSymbol?: string | null;
  ownerName?: string | null;
  isActive?: boolean;
}

export interface PairPerk {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /** @format double */
  price?: number;
  title?: string | null;
  imageUrl?: string | null;
  /** @format int32 */
  pairId?: number;
  pair?: Pair;
}

export interface PairPerkDto {
  /** @format double */
  price?: number;
  title?: string | null;
  imageUrl?: string | null;
}

export interface PairPerkListDto {
  /** @format int32 */
  id?: number;
  /** @format double */
  price?: number;
  title?: string | null;
  imageUrl?: string | null;
}

export interface PairUIKeyValue {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  key?: string | null;
  value?: string | null;
  type?: string | null;
  /** @format int32 */
  pairId?: number;
  pair?: Pair;
}

export interface PairUIKeyValueDto {
  key?: string | null;
  value?: string | null;
  type?: string | null;
}

export interface PairUIKeyValueListDto {
  /** @format int32 */
  id?: number;
  key?: string | null;
  value?: string | null;
  type?: string | null;
  /** @format int32 */
  pairId?: number;
}

export interface PairsDto {
  /** @format int32 */
  quoteTokenDecimal?: number;
  /** @format int32 */
  baseTokenDecimal?: number;
  exchangePairId?: string | null;
  orderbook?: string | null;
  chainId?: string | null;
  baseTokenAddress?: string | null;
  quoteTokenAddress?: string | null;
  trezorAddress?: string | null;
  symbol?: string | null;
  baseTokenSymbol?: string | null;
  quoteTokenSymbol?: string | null;
  logoAddress?: string | null;
  coverAddress?: string | null;
  title?: string | null;
  description?: string | null;
  owner?: OwnerDto;
  /** @format int32 */
  ownerId?: number;
  categories?: CategoryDto[] | null;
}

export interface ParameterInfo {
  attributes?: ParameterAttributes;
  member?: MemberInfo;
  name?: string | null;
  parameterType?: Type;
  /** @format int32 */
  position?: number;
  isIn?: boolean;
  isLcid?: boolean;
  isOptional?: boolean;
  isOut?: boolean;
  isRetval?: boolean;
  defaultValue?: any;
  rawDefaultValue?: any;
  hasDefaultValue?: boolean;
  customAttributes?: CustomAttributeData[] | null;
  /** @format int32 */
  metadataToken?: number;
}

export interface PasswordComplexitySetting {
  /** @format int32 */
  allowedMinimumLength?: number;
  requireDigit?: boolean;
  requireLowercase?: boolean;
  requireNonAlphanumeric?: boolean;
  requireUppercase?: boolean;
  /** @format int32 */
  requiredLength?: number;
}

export interface PayPalConfigurationDto {
  clientId?: string | null;
  demoUsername?: string | null;
  demoPassword?: string | null;
  disabledFundings?: string[] | null;
}

export interface PaymentGatewayModel {
  gatewayType?: SubscriptionPaymentGatewayType;
  supportsRecurringPayments?: boolean;
}

export interface PaymentVerifyInput {
  token?: string | null;
}

export interface PostGetOrderbookAccountOpenOrdersRequest {
  account?: string | null;
  chain_id?: string | null;
  orderbook?: string | null;
  /** @format int32 */
  page?: number | null;
  /** @format int32 */
  page_size?: number | null;
  pair_id?: string | null;
}

export interface PostGetOrderbookAccountOpenOrdersResponse {
  orders?: Order[] | null;
  /** @format int32 */
  total?: number | null;
}

export interface PostGetOrderbookAccountOrderHistoryRequest {
  account?: string | null;
  chain_id?: string | null;
  orderbook?: string | null;
  /** @format int32 */
  page?: number | null;
  /** @format int32 */
  page_size?: number | null;
  pair_id?: string | null;
}

export interface PostGetOrderbookAccountOrderHistoryResponse {
  orders?: Order[] | null;
  /** @format int32 */
  total?: number | null;
}

export interface PostGetOrderbookOrdersInQueueRequest {
  chain_id?: string | null;
  orderbook?: string | null;
  /** @format int32 */
  page?: number | null;
  /** @format int32 */
  page_size?: number | null;
  pair_id?: string | null;
  queue_id?: string | null;
}

export interface PostGetOrderbookOrdersInQueueResponse {
  orders?: Order[] | null;
  /** @format int32 */
  total?: number | null;
}

export interface PostGetOrderbookStatsOHLCRequest {
  chain_id?: string | null;
  /** @format int32 */
  from_ts?: number | null;
  /** @format int32 */
  interval_minutes?: number | null;
  orderbook?: string | null;
  pair_id?: string | null;
  /** @format int32 */
  to_ts?: number | null;
}

export interface PostGetOrderbookStatsOHLCResponse {
  data?: Ohlc[] | null;
}

export interface PostGetOrderbookTradesRequest {
  account?: string | null;
  chain_id?: string | null;
  order_type?: string | null;
  orderbook?: string | null;
  /** @format int32 */
  page?: number | null;
  /** @format int32 */
  page_size?: number | null;
  pair_id?: string | null;
}

export interface PostGetOrderbookTradesResponse {
  /** @format int32 */
  total?: number | null;
  trades?: Trade[] | null;
}

export interface PostGetUTokenDeploymentsRequest {
  ref_deployments?: TokenDeploymentInput[] | null;
  utr_chain_id?: string | null;
}

export interface PostGetUTokenDeploymentsResponse {
  utokens?: UTokenDeployments[] | null;
}

export interface ProgressApplicantResult {
  /** @format int64 */
  applicantId?: number;
  workFlowKey?: string | null;
  status?: ApplicantProgressStatus;
  message?: string | null;
  currentStep?: FlowStep;
  flowSteps?: FlowStep[] | null;
  stepInfoList?: StepInfo[] | null;
}

export interface PropertyInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  propertyType?: Type;
  attributes?: PropertyAttributes;
  isSpecialName?: boolean;
  canRead?: boolean;
  canWrite?: boolean;
  getMethod?: MethodInfo;
  setMethod?: MethodInfo;
}

export interface PutAccountInWhitelistRequest {
  ext_account_id?: string | null;
  trezors?: ContractDeployment[] | null;
}

export interface QuestionDto {
  /** @format int32 */
  id?: number;
  text?: string | null;
  canMultipleAnswer?: boolean | null;
  isRequired?: boolean | null;
  /** @format int32 */
  pageNumber?: number | null;
  /** @format double */
  min?: number | null;
  /** @format double */
  max?: number | null;
  regex?: string | null;
  subtitle?: string | null;
  description?: string | null;
  defaultAnswers?: string[] | null;
}

export interface QuestionGroupDto {
  name?: string | null;
  questions?: QuestionDto[] | null;
}

export interface QuestionResult {
  /** @format int32 */
  questionId?: number;
  values?: string[] | null;
}

export interface QuestionnaireOutput {
  /** @format int32 */
  id?: number;
  name?: string | null;
  displayName?: string | null;
  subtitle?: string | null;
  description?: string | null;
  questionGroups?: QuestionGroupDto[] | null;
  questions?: QuestionDto[] | null;
}

export interface QuestionnaireResultDto {
  questionnaire?: string | null;
  question?: string | null;
  answers?: string[] | null;
}

export interface RabbitExchangeOrderResponse {
  /** @format int64 */
  id?: number;
  orderEventType?: OrderEventType;
  rawData?: string | null;
  /** @format int64 */
  localOrderId?: number | null;
  localOrder?: LocalOrder;
  /** @format date-time */
  creationTime?: string;
}

export interface RabbitExchangeOrderResponseDto {
  object_type?: string | null;
  order_event_type?: OrderEventType;
  /** @format int64 */
  order_id?: number | null;
  pair_id?: string | null;
  order_quantity?: string | null;
  order_remaining_quantity?: string | null;
  order_event_hash?: string | null;
  order_price?: string | null;
  order_type?: string | null;
  order_is_bid?: boolean | null;
  order_is_filled?: boolean | null;
  order_is_cancelled?: boolean | null;
  order_is_expired?: boolean | null;
  order_data?: string | null;
  trade_data?: string | null;
  index_tx_hash?: string | null;
  /** @format int64 */
  order_event_ts?: number | null;
  trade_quantity?: string | null;
  trade_price?: string | null;
  trade_volume?: string | null;
  pair_serve_fixed_fee?: string | null;
  pair_volume_micro_percentage_fee?: string | null;
  order_alarm_abi?: string | null;
  order_alarm_data?: string | null;
  order_expire_ts?: string | null;
}

export interface RabbitExchangeOrderResponseListDto {
  /** @format int64 */
  id?: number;
  orderEventType?: OrderEventType;
  rawData?: string | null;
  /** @format int64 */
  localOrderId?: number | null;
  /** @format date-time */
  creationTime?: string;
  data?: DeserializeExchangeOrderResponse;
}

export interface RabbitExchangeTradeResponseListDto {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  data?: DeserializeExchangeTradeResponse;
}

export interface RecentTenant {
  /** @format int32 */
  id?: number;
  name?: string | null;
  /** @format date-time */
  creationTime?: string;
}

export interface RefreshTokenResult {
  accessToken?: string | null;
  encryptedAccessToken?: string | null;
  /** @format int32 */
  expireInSeconds?: number;
}

export interface RegionalStatCountry {
  countryName?: string | null;
  /** @format double */
  sales?: number;
  change?: number[] | null;
  /** @format double */
  averagePrice?: number;
  /** @format double */
  totalPrice?: number;
}

export interface RegisterInput {
  /**
   * @minLength 0
   * @maxLength 64
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 64
   */
  surname: string;
  /**
   * @minLength 0
   * @maxLength 256
   */
  userName: string;
  /**
   * @format email
   * @minLength 0
   * @maxLength 256
   */
  emailAddress: string;
  /**
   * @minLength 0
   * @maxLength 32
   */
  password: string;
  captchaResponse?: string | null;
}

export interface RegisterOutput {
  canLogin?: boolean;
}

export interface RegisterTenantInput {
  /**
   * @minLength 0
   * @maxLength 64
   */
  tenancyName: string;
  /**
   * @minLength 0
   * @maxLength 64
   */
  name: string;
  /**
   * @format email
   * @minLength 0
   * @maxLength 256
   */
  adminEmailAddress: string;
  /**
   * @minLength 0
   * @maxLength 64
   */
  adminName?: string | null;
  /**
   * @minLength 0
   * @maxLength 64
   */
  adminSurname?: string | null;
  /**
   * @minLength 0
   * @maxLength 32
   */
  adminPassword?: string | null;
  captchaResponse?: string | null;
  subscriptionStartType?: SubscriptionStartType;
  paymentPeriodType?: PaymentPeriodType;
  /** @format int32 */
  editionId?: number | null;
  successUrl?: string | null;
  errorUrl?: string | null;
}

export interface RegisterTenantOutput {
  /** @format int32 */
  tenantId?: number;
  tenancyName?: string | null;
  name?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  isTenantActive?: boolean;
  isActive?: boolean;
  isEmailConfirmationRequired?: boolean;
  /** @format int64 */
  paymentId?: number | null;
}

export interface RenamePageInput {
  dashboardName?: string | null;
  id?: string | null;
  name?: string | null;
  application?: string | null;
}

export interface RequestIdentityResult {
  isSuccess?: boolean;
  message?: string | null;
  nextStep?: FlowStep;
  /** @format int64 */
  applicantId?: number;
  url?: string | null;
}

export interface ResetPasswordInput {
  /** @format int64 */
  userId?: number;
  resetCode?: string | null;
  /** @format date-time */
  expireDate?: string;
  password?: string | null;
  returnUrl?: string | null;
  singleSignIn?: string | null;
  c?: string | null;
}

export interface ResetPasswordOutput {
  canLogin?: boolean;
  userName?: string | null;
}

export interface ResolveTenantIdInput {
  c?: string | null;
}

export interface RiskCalculationInput {
  /** @format int64 */
  applicantId?: number | null;
  criteriaValueInputs?: CriteriaValueInput[] | null;
}

export interface RiskCriteriaDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  builtInType?: CriteriaBuiltInType;
  defaultValues?: string[] | null;
  multipleValue?: boolean;
  isRequired?: boolean;
}

export interface RiskCriteriaLightDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  displayName?: string | null;
}

export interface RiskCriteriaOut {
  /** @format int32 */
  criteriaId?: number;
  name?: string | null;
  /** @format double */
  value?: number;
  error?: string | null;
}

export interface RiskCriteriaResultDto {
  /** @format int32 */
  riskCriteriaId?: number | null;
  riskCriteria?: string | null;
  /** @format int32 */
  score?: number;
  answer?: string | null;
}

export interface RiskScoringPlanDto {
  name?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  criterias?: RiskCriteriaLightDto[] | null;
}

export interface RiskScoringResult {
  isSuccess?: boolean;
  message?: string | null;
  nextStep?: FlowStep;
  riskLevel?: RiskLevel;
  /** @format double */
  score?: number;
  error?: string | null;
  riskCriterias?: RiskCriteriaOut[] | null;
}

export interface RiskScoringResultDto {
  /** @format int64 */
  applicantId?: number | null;
  /** @format int32 */
  totalScore?: number;
  riskPlanName?: string | null;
  riskLevel?: RiskLevel;
  riskCriteriaResults?: RiskCriteriaResultDto[] | null;
}

export interface RoleEditDto {
  /** @format int32 */
  id?: number | null;
  /** @minLength 1 */
  displayName: string;
  isDefault?: boolean;
}

export interface RoleListDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  displayName?: string | null;
  isStatic?: boolean;
  isDefault?: boolean;
  /** @format date-time */
  creationTime?: string;
}

export interface RolesToOrganizationUnitInput {
  roleIds?: number[] | null;
  /**
   * @format int64
   * @min 1
   */
  organizationUnitId?: number;
}

export interface RuntimeFieldHandle {
  value?: IntPtr;
}

export interface RuntimeMethodHandle {
  value?: IntPtr;
}

export interface RuntimeTypeHandle {
  value?: IntPtr;
}

export interface SalesSummaryData {
  period?: string | null;
  /** @format int32 */
  sales?: number;
  /** @format int32 */
  profit?: number;
}

export interface SavePageInput {
  dashboardName?: string | null;
  application?: string | null;
  pages?: Page[] | null;
}

export interface SecuritySettingsEditDto {
  allowOneConcurrentLoginPerUser?: boolean;
  useDefaultPasswordComplexitySettings?: boolean;
  passwordComplexity?: PasswordComplexitySetting;
  defaultPasswordComplexity?: PasswordComplexitySetting;
  userLockOut?: UserLockOutSettingsEditDto;
  twoFactorLogin?: TwoFactorLoginSettingsEditDto;
}

export interface SendAndGetDateWithTextInput {
  text?: string | null;
  /** @format date-time */
  date?: string;
}

export interface SendEmailActivationLinkInput {
  /** @minLength 1 */
  emailAddress: string;
}

export interface SendPasswordResetCodeInput {
  /**
   * @minLength 1
   * @maxLength 256
   */
  emailAddress: string;
}

export interface SendTestEmailInput {
  /**
   * @minLength 1
   * @maxLength 256
   */
  emailAddress: string;
}

export interface SendTwoFactorAuthCodeModel {
  /**
   * @format int64
   * @min 1
   */
  userId?: number;
  /** @minLength 1 */
  provider: string;
}

export interface SendVerificationEmailInputDto {
  email?: string | null;
}

export interface SendVerificationSmsInputDto {
  phoneNumber?: string | null;
}

export interface SessionTimeOutSettingsEditDto {
  isEnabled?: boolean;
  /**
   * @format int32
   * @min 10
   * @max 2147483647
   */
  timeOutSecond?: number;
  /**
   * @format int32
   * @min 10
   * @max 2147483647
   */
  showTimeOutNotificationSecond?: number;
  showLockScreenWhenTimedOut?: boolean;
}

export interface SetDefaultLanguageInput {
  /**
   * @minLength 0
   * @maxLength 128
   */
  name: string;
}

export interface SetNotificationAsReadOutput {
  success?: boolean;
}

export interface Setting {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  userId?: number | null;
  /**
   * @minLength 0
   * @maxLength 256
   */
  name: string;
  value?: string | null;
}

export interface StartExtendSubscriptionInput {
  successUrl?: string | null;
  errorUrl?: string | null;
}

export interface StartTrialToBuySubscriptionInput {
  paymentPeriodType?: PaymentPeriodType;
  successUrl?: string | null;
  errorUrl?: string | null;
}

export interface StartUpgradeSubscriptionInput {
  /** @format int32 */
  targetEditionId?: number;
  successUrl?: string | null;
  errorUrl?: string | null;
  paymentPeriodType?: PaymentPeriodType;
}

export interface StartUpgradeSubscriptionOutput {
  /** @format int64 */
  paymentId?: number | null;
  upgraded?: boolean;
}

export interface StaticPageDto {
  name?: string | null;
  title?: string | null;
  slug?: string | null;
  externalUrl?: string | null;
  body?: string | null;
}

export interface StaticPageListDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  title?: string | null;
  externalUrl?: string | null;
  /** @format date-time */
  creationTime?: string;
}

export interface StepInfo {
  action?: WorkflowStepAction;
  /** @format int32 */
  order?: number;
  name?: string | null;
  displayName?: string | null;
  subtitle?: string | null;
  description?: string | null;
}

export type String = string;

export interface StringOutput {
  output?: string | null;
}

export interface StripeConfigurationDto {
  publishableKey?: string | null;
}

export interface StripeCreatePaymentSessionInput {
  /** @format int64 */
  paymentId?: number;
  successUrl?: string | null;
  cancelUrl?: string | null;
}

export interface StripePaymentResultOutput {
  paymentDone?: boolean;
  callbackUrl?: string | null;
}

export interface StructLayoutAttribute {
  typeId?: any;
  value?: LayoutKind;
}

export interface SubscribableEditionComboboxItemDto {
  value?: string | null;
  displayText?: string | null;
  isSelected?: boolean;
  isFree?: boolean | null;
}

export interface SubscriptionPaymentDto {
  /** @format int64 */
  id?: number;
  gateway?: SubscriptionPaymentGatewayType;
  /** @format int32 */
  tenantId?: number;
  /** @format int32 */
  dayCount?: number;
  paymentPeriodType?: PaymentPeriodType;
  paymentId?: string | null;
  /** @format int64 */
  invoiceNo?: number;
  status?: SubscriptionPaymentStatus;
  isRecurring?: boolean | null;
  isProrationPayment?: boolean;
  externalPaymentId?: string | null;
  successUrl?: string | null;
  errorUrl?: string | null;
  subscriptionPaymentProducts?: SubscriptionPaymentProductDto[] | null;
  extraProperties?: Record<string, any>;
  /** @format double */
  totalAmount?: number;
}

export interface SubscriptionPaymentListDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  gateway?: string | null;
  /** @format int32 */
  dayCount?: number;
  paymentPeriodType?: string | null;
  externalPaymentId?: string | null;
  payerId?: string | null;
  status?: string | null;
  /** @format int32 */
  tenantId?: number;
  invoiceNo?: string | null;
  /** @format double */
  totalAmount?: number;
  subscriptionPaymentProducts?: SubscriptionPaymentProductDto[] | null;
}

export interface SubscriptionPaymentProductDto {
  /** @format int64 */
  id?: number;
  description?: string | null;
  /** @format double */
  amount?: number;
  /** @format int32 */
  count?: number;
  extraProperties?: Record<string, any>;
}

export interface SwitchToLinkedAccountInput {
  /** @format int32 */
  targetTenantId?: number | null;
  /**
   * @format int64
   * @min 1
   */
  targetUserId?: number;
}

export interface SwitchToLinkedAccountOutput {
  switchAccountToken?: string | null;
  tenancyName?: string | null;
}

export interface SwitchedAccountAuthenticateResultModel {
  accessToken?: string | null;
  encryptedAccessToken?: string | null;
  /** @format int32 */
  expireInSeconds?: number;
}

export interface TableauView {
  tags?: Record<string, string | null>;
  id?: string | null;
  name?: string | null;
  contentUrl?: string | null;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  viewUrlName?: string | null;
  image?: string | null;
  workbookName?: string | null;
  embedUrl?: string | null;
}

export interface TaxCountries {
  country?: string | null;
  taxNumber?: string | null;
}

export interface TenantBillingSettingsEditDto {
  legalName?: string | null;
  address?: string | null;
  taxVatNo?: string | null;
}

export interface TenantEditDto {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 64
   */
  tenancyName: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  name: string;
  connectionString?: string | null;
  /** @format int32 */
  editionId?: number | null;
  isActive?: boolean;
  /** @format date-time */
  subscriptionEndDateUtc?: string | null;
  isInTrialPeriod?: boolean;
}

export interface TenantEdition {
  label?: string | null;
  /** @format int32 */
  value?: number;
}

export interface TenantEmailSettingsEditDto {
  defaultFromAddress?: string | null;
  defaultFromDisplayName?: string | null;
  smtpHost?: string | null;
  /** @format int32 */
  smtpPort?: number;
  smtpUserName?: string | null;
  smtpPassword?: string | null;
  smtpDomain?: string | null;
  smtpEnableSsl?: boolean;
  smtpUseDefaultCredentials?: boolean;
  useHostDefaultEmailSettings?: boolean;
}

export interface TenantListDto {
  /** @format int32 */
  id?: number;
  tenancyName?: string | null;
  name?: string | null;
  editionDisplayName?: string | null;
  connectionString?: string | null;
  isActive?: boolean;
  /** @format date-time */
  creationTime?: string;
  /** @format date-time */
  subscriptionEndDateUtc?: string | null;
  /** @format int32 */
  editionId?: number | null;
  isInTrialPeriod?: boolean;
}

export interface TenantLoginInfoDto {
  /** @format int32 */
  id?: number;
  tenancyName?: string | null;
  name?: string | null;
  /** @format uuid */
  darkLogoId?: string | null;
  darkLogoFileType?: string | null;
  /** @format uuid */
  darkLogoMinimalId?: string | null;
  darkLogoMinimalFileType?: string | null;
  /** @format uuid */
  lightLogoId?: string | null;
  lightLogoFileType?: string | null;
  /** @format uuid */
  lightLogoMinimalId?: string | null;
  lightLogoMinimalFileType?: string | null;
  /** @format uuid */
  customCssId?: string | null;
  /** @format date-time */
  subscriptionEndDateUtc?: string | null;
  isInTrialPeriod?: boolean;
  subscriptionPaymentType?: SubscriptionPaymentType;
  edition?: EditionInfoDto;
  featureValues?: NameValueDto[] | null;
  /** @format date-time */
  creationTime?: string;
  paymentPeriodType?: PaymentPeriodType;
  subscriptionDateString?: string | null;
  creationTimeString?: string | null;
}

export interface TenantManagementSettingsEditDto {
  allowSelfRegistration?: boolean;
  isNewRegisteredTenantActiveByDefault?: boolean;
  useCaptchaOnRegistration?: boolean;
  /** @format int32 */
  defaultEditionId?: number | null;
}

export interface TenantNotification {
  /** @format uuid */
  id?: string;
  /** @format int32 */
  tenantId?: number | null;
  notificationName?: string | null;
  data?: NotificationData;
  entityType?: Type;
  entityTypeName?: string | null;
  entityId?: any;
  severity?: NotificationSeverity;
  /** @format date-time */
  creationTime?: string;
}

export interface TenantOtherSettingsEditDto {
  isQuickThemeSelectEnabled?: boolean;
}

export interface TenantSettingsEditDto {
  general?: GeneralSettingsEditDto;
  userManagement: TenantUserManagementSettingsEditDto;
  email?: TenantEmailSettingsEditDto;
  ldap?: LdapSettingsEditDto;
  security: SecuritySettingsEditDto;
  billing?: TenantBillingSettingsEditDto;
  otherSettings?: TenantOtherSettingsEditDto;
  externalLoginProviderSettings?: ExternalLoginProviderSettingsEditDto;
}

export interface TenantUserManagementSettingsEditDto {
  allowSelfRegistration?: boolean;
  isNewRegisteredUserActiveByDefault?: boolean;
  isEmailConfirmationRequiredForLogin?: boolean;
  useCaptchaOnRegistration?: boolean;
  useCaptchaOnLogin?: boolean;
  isCookieConsentEnabled?: boolean;
  isQuickThemeSelectEnabled?: boolean;
  allowUsingGravatarProfilePicture?: boolean;
  sessionTimeOutSettings?: SessionTimeOutSettingsEditDto;
}

export interface ThemeFooterSettingsDto {
  fixedFooter?: boolean;
}

export interface ThemeHeaderSettingsDto {
  desktopFixedHeader?: boolean;
  mobileFixedHeader?: boolean;
  minimizeDesktopHeaderType?: string | null;
}

export interface ThemeLayoutSettingsDto {
  layoutType?: string | null;
  darkMode?: boolean;
}

export interface ThemeMenuSettingsDto {
  position?: string | null;
  asideSkin?: string | null;
  fixedAside?: boolean;
  allowAsideMinimizing?: boolean;
  defaultMinimizedAside?: boolean;
  submenuToggle?: string | null;
  searchActive?: boolean;
  enableSecondary?: boolean;
  hoverableAside?: boolean;
}

export interface ThemeSettingsDto {
  theme?: string | null;
  layout?: ThemeLayoutSettingsDto;
  header?: ThemeHeaderSettingsDto;
  subHeader?: ThemeSubHeaderSettingsDto;
  menu?: ThemeMenuSettingsDto;
  footer?: ThemeFooterSettingsDto;
  toolbar?: ThemeToolbarSettingsDto;
}

export interface ThemeSubHeaderSettingsDto {
  fixedSubHeader?: boolean;
  subheaderStyle?: string | null;
  /** @format int32 */
  subheaderSize?: number;
  titleStyle?: string | null;
  containerStyle?: string | null;
  subContainerStyle?: string | null;
}

export interface ThemeToolbarSettingsDto {
  desktopFixedToolbar?: boolean;
  mobileFixedToolbar?: boolean;
}

export interface TimeSpan {
  /** @format int64 */
  ticks?: number;
  /** @format int32 */
  days?: number;
  /** @format int32 */
  hours?: number;
  /** @format int32 */
  milliseconds?: number;
  /** @format int32 */
  microseconds?: number;
  /** @format int32 */
  nanoseconds?: number;
  /** @format int32 */
  minutes?: number;
  /** @format int32 */
  seconds?: number;
  /** @format double */
  totalDays?: number;
  /** @format double */
  totalHours?: number;
  /** @format double */
  totalMilliseconds?: number;
  /** @format double */
  totalMicroseconds?: number;
  /** @format double */
  totalNanoseconds?: number;
  /** @format double */
  totalMinutes?: number;
  /** @format double */
  totalSeconds?: number;
}

export interface TokenDeployment {
  chain_id?: string | null;
  eth?: TokenInfo;
  eth_address?: string | null;
  non_eth?: TokenInfo;
  non_eth_address?: string | null;
  token_id?: string | null;
}

export interface TokenDeploymentInput {
  chain_id?: string | null;
  eth_address?: string | null;
  non_eth_address?: string | null;
  token_id?: string | null;
}

export interface TokenInfo {
  address?: string | null;
  chain_id?: string | null;
  decimals?: string | null;
  name?: string | null;
  symbol?: string | null;
  token_id?: string | null;
  total_supply?: string | null;
  type?: string | null;
}

export interface TopStatsData {
  /** @format int32 */
  newTenantsCount?: number;
  /** @format double */
  newSubscriptionAmount?: number;
  /** @format int32 */
  dashboardPlaceholder1?: number;
  /** @format int32 */
  dashboardPlaceholder2?: number;
}

export interface TopUpTransactionListDto {
  /** @format int32 */
  id?: number;
  /** @format int64 */
  userId?: number;
  userName?: string | null;
  /** @format double */
  amount?: number;
  comment?: string | null;
  paymentStatus?: PaymentStatus;
  transferStatus?: TopupTransferStatus;
  method?: TopupMethod;
  /** @format date-time */
  creationTime?: string;
}

export interface TotalTopUpsOutput {
  /** @format int32 */
  total?: number;
  /** @format int32 */
  today?: number;
}

export interface Trade {
  ask_fee?: string | null;
  ask_order?: Order;
  ask_order_id?: string | null;
  bid_fee?: string | null;
  bid_order?: Order;
  bid_order_id?: string | null;
  buy?: boolean | null;
  creator?: string | null;
  data?: string | null;
  dataAbi?: string | null;
  id?: string | null;
  price?: string | null;
  quantity?: string | null;
  timestamp?: string | null;
  trade_type?: string | null;
  volume?: string | null;
}

export interface TransferCashRequestInput {
  /** @format int64 */
  fromUser?: number;
  /** @format int64 */
  toUser?: number;
  amount?: string | null;
}

export interface TrezorBalances {
  ledgers?: Record<string, LedgerBalances>;
}

export interface TrezorHistoryEntry {
  activity_id?: string | null;
  amount?: string | null;
  caller_account?: string | null;
  chain_id?: string | null;
  contract?: string | null;
  contract_type?: string | null;
  data?: string | null;
  from_account?: string | null;
  from_reserve_id?: string | null;
  from_stash?: string | null;
  from_vault?: string | null;
  hash?: string | null;
  ledger_id?: string | null;
  operation?: string | null;
  sender_account?: string | null;
  timestamp?: string | null;
  to_account?: string | null;
  to_reserve_id?: string | null;
  to_stash?: string | null;
  to_vault?: string | null;
  token_id?: string | null;
  trezor_address?: string | null;
}

export interface TrezorWhitelistStatus {
  is_whitelisted?: boolean | null;
  trezor?: ContractDeployment;
}

export interface TwitterExternalLoginProviderSettings {
  consumerKey?: string | null;
  consumerSecret?: string | null;
}

export interface TwitterGetAccessTokenResponse {
  accessToken?: string | null;
  accessTokenSecret?: string | null;
  userId?: string | null;
  userName?: string | null;
}

export interface TwitterGetRequestTokenResponse {
  token?: string | null;
  secret?: string | null;
  confirmed?: boolean;
  redirectUrl?: string | null;
}

export interface TwoFactorLoginSettingsEditDto {
  isEnabledForApplication?: boolean;
  isEnabled?: boolean;
  isEmailProviderEnabled?: boolean;
  isSmsProviderEnabled?: boolean;
  isRememberBrowserEnabled?: boolean;
  isGoogleAuthenticatorEnabled?: boolean;
}

export interface Type {
  name?: string | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  isInterface?: boolean;
  memberType?: MemberTypes;
  namespace?: string | null;
  assemblyQualifiedName?: string | null;
  fullName?: string | null;
  assembly?: Assembly;
  module?: Module;
  isNested?: boolean;
  declaringType?: Type;
  declaringMethod?: MethodBase;
  reflectedType?: Type;
  underlyingSystemType?: Type;
  isTypeDefinition?: boolean;
  isArray?: boolean;
  isByRef?: boolean;
  isPointer?: boolean;
  isConstructedGenericType?: boolean;
  isGenericParameter?: boolean;
  isGenericTypeParameter?: boolean;
  isGenericMethodParameter?: boolean;
  isGenericType?: boolean;
  isGenericTypeDefinition?: boolean;
  isSZArray?: boolean;
  isVariableBoundArray?: boolean;
  isByRefLike?: boolean;
  isFunctionPointer?: boolean;
  isUnmanagedFunctionPointer?: boolean;
  hasElementType?: boolean;
  genericTypeArguments?: Type[] | null;
  /** @format int32 */
  genericParameterPosition?: number;
  genericParameterAttributes?: GenericParameterAttributes;
  attributes?: TypeAttributes;
  isAbstract?: boolean;
  isImport?: boolean;
  isSealed?: boolean;
  isSpecialName?: boolean;
  isClass?: boolean;
  isNestedAssembly?: boolean;
  isNestedFamANDAssem?: boolean;
  isNestedFamily?: boolean;
  isNestedFamORAssem?: boolean;
  isNestedPrivate?: boolean;
  isNestedPublic?: boolean;
  isNotPublic?: boolean;
  isPublic?: boolean;
  isAutoLayout?: boolean;
  isExplicitLayout?: boolean;
  isLayoutSequential?: boolean;
  isAnsiClass?: boolean;
  isAutoClass?: boolean;
  isUnicodeClass?: boolean;
  isCOMObject?: boolean;
  isContextful?: boolean;
  isEnum?: boolean;
  isMarshalByRef?: boolean;
  isPrimitive?: boolean;
  isValueType?: boolean;
  isSignatureType?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  structLayoutAttribute?: StructLayoutAttribute;
  typeInitializer?: ConstructorInfo;
  typeHandle?: RuntimeTypeHandle;
  /** @format uuid */
  guid?: string;
  baseType?: Type;
  /** @deprecated */
  isSerializable?: boolean;
  containsGenericParameters?: boolean;
  isVisible?: boolean;
}

export interface TypeInfo {
  name?: string | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  isInterface?: boolean;
  memberType?: MemberTypes;
  namespace?: string | null;
  assemblyQualifiedName?: string | null;
  fullName?: string | null;
  assembly?: Assembly;
  module?: Module;
  isNested?: boolean;
  declaringType?: Type;
  declaringMethod?: MethodBase;
  reflectedType?: Type;
  underlyingSystemType?: Type;
  isTypeDefinition?: boolean;
  isArray?: boolean;
  isByRef?: boolean;
  isPointer?: boolean;
  isConstructedGenericType?: boolean;
  isGenericParameter?: boolean;
  isGenericTypeParameter?: boolean;
  isGenericMethodParameter?: boolean;
  isGenericType?: boolean;
  isGenericTypeDefinition?: boolean;
  isSZArray?: boolean;
  isVariableBoundArray?: boolean;
  isByRefLike?: boolean;
  isFunctionPointer?: boolean;
  isUnmanagedFunctionPointer?: boolean;
  hasElementType?: boolean;
  genericTypeArguments?: Type[] | null;
  /** @format int32 */
  genericParameterPosition?: number;
  genericParameterAttributes?: GenericParameterAttributes;
  attributes?: TypeAttributes;
  isAbstract?: boolean;
  isImport?: boolean;
  isSealed?: boolean;
  isSpecialName?: boolean;
  isClass?: boolean;
  isNestedAssembly?: boolean;
  isNestedFamANDAssem?: boolean;
  isNestedFamily?: boolean;
  isNestedFamORAssem?: boolean;
  isNestedPrivate?: boolean;
  isNestedPublic?: boolean;
  isNotPublic?: boolean;
  isPublic?: boolean;
  isAutoLayout?: boolean;
  isExplicitLayout?: boolean;
  isLayoutSequential?: boolean;
  isAnsiClass?: boolean;
  isAutoClass?: boolean;
  isUnicodeClass?: boolean;
  isCOMObject?: boolean;
  isContextful?: boolean;
  isEnum?: boolean;
  isMarshalByRef?: boolean;
  isPrimitive?: boolean;
  isValueType?: boolean;
  isSignatureType?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  structLayoutAttribute?: StructLayoutAttribute;
  typeInitializer?: ConstructorInfo;
  typeHandle?: RuntimeTypeHandle;
  /** @format uuid */
  guid?: string;
  baseType?: Type;
  /** @deprecated */
  isSerializable?: boolean;
  containsGenericParameters?: boolean;
  isVisible?: boolean;
  genericTypeParameters?: Type[] | null;
  declaredConstructors?: ConstructorInfo[] | null;
  declaredEvents?: EventInfo[] | null;
  declaredFields?: FieldInfo[] | null;
  declaredMembers?: MemberInfo[] | null;
  declaredMethods?: MethodInfo[] | null;
  declaredNestedTypes?: TypeInfo[] | null;
  declaredProperties?: PropertyInfo[] | null;
  implementedInterfaces?: Type[] | null;
}

export interface UTokenDeployments {
  deployments?: TokenDeployment[] | null;
  id?: string | null;
}

export interface UiCustomizationSettingsDto {
  baseSettings?: ThemeSettingsDto;
  isLeftMenuUsed?: boolean;
  isTopMenuUsed?: boolean;
  isTabMenuUsed?: boolean;
  allowMenuScroll?: boolean;
}

export interface UnblockUserInput {
  /**
   * @format int64
   * @min 1
   */
  userId?: number;
  /** @format int32 */
  tenantId?: number | null;
}

export interface UnlinkUserInput {
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  userId?: number;
}

export interface UnsignedEvmTransactionDTO {
  chainId?: string | null;
  nonce?: string | null;
  to?: string | null;
  gasLimit?: string | null;
  domainId?: string | null;
  value?: string | null;
  data?: string | null;
}

export interface UpdateEditionDto {
  edition: EditionEditDto;
  featureValues: NameValueDto[];
}

export interface UpdateGoogleAuthenticatorKeyInput {
  googleAuthenticatorKey?: string | null;
  authenticatorCode?: string | null;
}

export interface UpdateGoogleAuthenticatorKeyOutput {
  recoveryCodes?: string[] | null;
}

export interface UpdateLanguageTextInput {
  /**
   * @minLength 0
   * @maxLength 128
   */
  languageName: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  sourceName: string;
  /**
   * @minLength 0
   * @maxLength 256
   */
  key: string;
  /**
   * @minLength 0
   * @maxLength 67108864
   */
  value: string;
}

export interface UpdateNotificationSettingsInput {
  receiveNotifications?: boolean;
  notifications?: NotificationSubscriptionDto[] | null;
}

export interface UpdateOrganizationUnitInput {
  /**
   * @format int64
   * @min 1
   */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 128
   */
  displayName: string;
}

export interface UpdatePaymentDto {
  /** @format int64 */
  paymentId?: number;
  gateway?: string | null;
  isRecurring?: boolean;
  extraProperties?: Record<string, any>;
}

export interface UpdateProfilePictureInput {
  /** @maxLength 400 */
  fileToken?: string | null;
  useGravatarProfilePicture?: boolean;
  /** @format int64 */
  userId?: number | null;
}

export interface UpdateSystemUserStatusDto {
  /** @format int64 */
  userId?: number;
  systemUser?: SystemUser;
}

export interface UpdateTenantFeaturesInput {
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  id?: number;
  featureValues: NameValueDto[];
}

export interface UpdateUserIssueDto {
  /** @format int64 */
  id?: number | null;
  /** @format int64 */
  userId?: number;
  type?: UserSystemStatusType;
  status?: UserStatus;
  solved?: boolean;
  comment?: string | null;
}

export interface UpdateUserPermissionsInput {
  /**
   * @format int64
   * @min 1
   * @max 2147483647
   */
  id?: number;
  grantedPermissionNames: string[];
}

export interface UpdateUserSignInTokenOutput {
  signInToken?: string | null;
  encodedUserId?: string | null;
  encodedTenantId?: string | null;
}

export interface UploadDocumentFileResultDto {
  name?: string | null;
  url?: string | null;
}

export interface UploadDocumentResultDto {
  name?: string | null;
  files?: UploadDocumentFileResultDto[] | null;
  documentReviewStatus?: DocumentReviewStatus;
  reviewDescription?: string | null;
}

export interface User {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /**
   * @minLength 0
   * @maxLength 64
   */
  authenticationSource?: string | null;
  /**
   * @minLength 0
   * @maxLength 256
   */
  userName: string;
  /** @format int32 */
  tenantId?: number | null;
  /**
   * @minLength 0
   * @maxLength 256
   */
  emailAddress: string;
  /**
   * @minLength 0
   * @maxLength 64
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 64
   */
  surname: string;
  fullName?: string | null;
  /**
   * @minLength 0
   * @maxLength 128
   */
  password: string;
  /**
   * @minLength 0
   * @maxLength 328
   */
  emailConfirmationCode?: string | null;
  /**
   * @minLength 0
   * @maxLength 328
   */
  passwordResetCode?: string | null;
  /** @format date-time */
  lockoutEndDateUtc?: string | null;
  /** @format int32 */
  accessFailedCount?: number;
  isLockoutEnabled?: boolean;
  /**
   * @minLength 0
   * @maxLength 32
   */
  phoneNumber?: string | null;
  isPhoneNumberConfirmed?: boolean;
  /**
   * @minLength 0
   * @maxLength 128
   */
  securityStamp?: string | null;
  isTwoFactorEnabled?: boolean;
  logins?: UserLogin[] | null;
  roles?: UserRole[] | null;
  claims?: UserClaim[] | null;
  permissions?: UserPermissionSetting[] | null;
  settings?: Setting[] | null;
  isEmailConfirmed?: boolean;
  isActive?: boolean;
  /**
   * @minLength 0
   * @maxLength 256
   */
  normalizedUserName: string;
  /**
   * @minLength 0
   * @maxLength 256
   */
  normalizedEmailAddress: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  concurrencyStamp?: string | null;
  tokens?: UserToken[] | null;
  deleterUser?: User;
  creatorUser?: User;
  lastModifierUser?: User;
  /** @format uuid */
  profilePictureId?: string | null;
  shouldChangePasswordOnNextLogin?: boolean;
  /** @format date-time */
  signInTokenExpireTimeUtc?: string | null;
  signInToken?: string | null;
  googleAuthenticatorKey?: string | null;
  recoveryCode?: string | null;
  organizationUnits?: UserOrganizationUnit[] | null;
  referenceId?: string | null;
  country?: Country;
  /** @format int32 */
  countryId?: number | null;
  veroId?: string | null;
  /** @format uuid */
  guid?: string;
  kycStatus?: UserKYCStatus;
  investorType?: InvestorType;
  status?: UserStatus;
  verifiedLevel?: KycType;
  riskLevel?: UserRiskLevel;
  systemUser?: SystemUser;
  needKyc?: boolean;
  fireblocksVaultId?: string | null;
  walletAddress?: string | null;
  issues?: UserIssue[] | null;
  kycAttempts?: UserKycAttempt[] | null;
  topUpTransactions?: DepositTransaction[] | null;
  withdrawTransactions?: WithdrawTransaction[] | null;
  investorCategorisations?: InvestorCategorisation[] | null;
  userExchangeTransactions?: UserExchangeTransaction[] | null;
  assetBalances?: AssetBalance[] | null;
  cashPostings?: CashPosting[] | null;
}

export interface UserBalanceActivityDto {
  /** @format double */
  amount?: number;
  comment?: string | null;
  paymentStatus?: PaymentStatus;
  transferStatus?: TopupTransferStatus;
  method?: TopupMethod;
  /** @format date-time */
  creationTime?: string;
}

export interface UserClaim {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  userId?: number;
  /**
   * @minLength 0
   * @maxLength 256
   */
  claimType?: string | null;
  claimValue?: string | null;
}

export interface UserDelegationDto {
  /** @format int64 */
  id?: number;
  username?: string | null;
  /** @format date-time */
  startTime?: string;
  /** @format date-time */
  endTime?: string;
}

export interface UserEditDto {
  /** @format int64 */
  id?: number | null;
  /**
   * @minLength 0
   * @maxLength 64
   */
  name: string;
  /**
   * @minLength 0
   * @maxLength 64
   */
  surname: string;
  /**
   * @minLength 0
   * @maxLength 256
   */
  userName: string;
  /**
   * @format email
   * @minLength 0
   * @maxLength 256
   */
  emailAddress: string;
  /**
   * @minLength 0
   * @maxLength 24
   */
  phoneNumber?: string | null;
  /**
   * @minLength 0
   * @maxLength 32
   */
  password?: string | null;
  isActive?: boolean;
  shouldChangePasswordOnNextLogin?: boolean;
  isTwoFactorEnabled?: boolean;
  isLockoutEnabled?: boolean;
}

export interface UserExchangeTransaction {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  requestDataRaw?: string | null;
  resultDataRaw?: string | null;
  receiptDataRaw?: string | null;
  status?: UserExchangeTransactionStatus;
  hash?: string | null;
  amount?: string | null;
  wallet?: string | null;
  comment?: string | null;
  type?: UserExchangeTransactionType;
  /** @format int64 */
  userId?: number;
  user?: User;
  /** @format int32 */
  pairId?: number | null;
  pair?: Pair;
  order?: LocalOrder;
  /** @format int64 */
  orderId?: number | null;
}

export interface UserExchangeTransactionOutput {
  /** @format int64 */
  id?: number;
  status?: UserExchangeTransactionStatus;
  type?: UserExchangeTransactionType;
  /** @format date-time */
  creationTime?: string;
}

export interface UserInformationListDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  surname?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  phoneNumber?: string | null;
  isEmailConfirmed?: boolean;
  isPhoneNumberConfirmed?: boolean;
  isActive?: boolean;
  /** @format date-time */
  creationTime?: string;
  kycStatus?: UserKYCStatus;
  status?: UserStatus;
  investorType?: InvestorType;
  country?: string | null;
}

export interface UserIssue {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /** @format int64 */
  userId?: number;
  user?: User;
  type?: UserSystemStatusType;
  kycType?: KycType;
  riskLevel?: UserRiskLevel;
  status?: UserStatus;
  solved?: boolean;
  comment?: string | null;
}

export interface UserIssueListDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  type?: UserSystemStatusType;
  kycType?: KycType;
  riskLevel?: UserRiskLevel;
  status?: UserStatus;
  solved?: boolean;
  comment?: string | null;
  /** @format date-time */
  creationTime?: string;
}

export interface UserKycAttempt {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /** @format int64 */
  userId?: number;
  user?: User;
  metaKycId?: string | null;
  active?: boolean;
  kycStatus?: UserKYCStatus;
  applicantStatus?: ApplicantStatus;
  kycType?: KycType;
  riskLevel?: UserRiskLevel;
  kycUrl?: string | null;
  submittedData?: string | null;
  /** @format date-time */
  actionDate?: string | null;
  kycDashoardUrl?: string | null;
  userKycAttemptResults?: UserKycAttemptResult[] | null;
}

export interface UserKycAttemptListDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  metaKycId?: string | null;
  active?: boolean;
  kycStatus?: UserKYCStatus;
  applicantStatus?: ApplicantStatus;
  kycType?: KycType;
  riskLevel?: UserRiskLevel;
  kycDashoardUrl?: string | null;
  /** @format date-time */
  creationTime?: string;
  /** @format date-time */
  actionDate?: string | null;
}

export interface UserKycAttemptOutput {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  userName?: string | null;
  metaKycId?: string | null;
  active?: boolean;
  kycStatus?: UserKYCStatus;
  applicantStatus?: ApplicantStatus;
  kycType?: KycType;
  riskLevel?: UserRiskLevel;
  /** @format date-time */
  creationTime?: string;
  /** @format date-time */
  actionDate?: string | null;
}

export interface UserKycAttemptResult {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /** @format int64 */
  userKycAttemptId?: number;
  userKycAttempt?: UserKycAttempt;
  parameterType?: ParameterType;
  parameter?: string | null;
  value?: string | null;
}

export interface UserListDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  surname?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  /** @format date-time */
  lockoutEndDateUtc?: string | null;
  phoneNumber?: string | null;
  /** @format uuid */
  profilePictureId?: string | null;
  isEmailConfirmed?: boolean;
  roles?: UserListRoleDto[] | null;
  isActive?: boolean;
  /** @format date-time */
  creationTime?: string;
}

export interface UserListRoleDto {
  /** @format int32 */
  roleId?: number;
  roleName?: string | null;
}

export interface UserLockOutSettingsEditDto {
  isEnabled?: boolean;
  /** @format int32 */
  maxFailedAccessAttemptsBeforeLockout?: number | null;
  /** @format int32 */
  defaultAccountLockoutSeconds?: number | null;
}

export interface UserLogin {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  userId?: number;
  /**
   * @minLength 0
   * @maxLength 128
   */
  loginProvider: string;
  /**
   * @minLength 0
   * @maxLength 256
   */
  providerKey: string;
}

export interface UserLoginAttemptDto {
  tenancyName?: string | null;
  userNameOrEmail?: string | null;
  clientIpAddress?: string | null;
  clientName?: string | null;
  browserInfo?: string | null;
  result?: string | null;
  /** @format date-time */
  creationTime?: string;
}

export interface UserLoginInfoDto {
  /** @format int64 */
  id?: number;
  name?: string | null;
  surname?: string | null;
  userName?: string | null;
  emailAddress?: string | null;
  profilePictureId?: string | null;
}

export interface UserNotification {
  /** @format uuid */
  id?: string;
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  userId?: number;
  state?: UserNotificationState;
  notification?: TenantNotification;
  targetNotifiers?: string | null;
  targetNotifiersList?: string[] | null;
}

export interface UserOrganizationUnit {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  userId?: number;
  /** @format int64 */
  organizationUnitId?: number;
  isDeleted?: boolean;
}

export interface UserPasswordSettingsEditDto {
  enableCheckingLastXPasswordWhenPasswordChange?: boolean;
  /** @format int32 */
  checkingLastXPasswordCount?: number;
  enablePasswordExpiration?: boolean;
  /** @format int32 */
  passwordExpirationDayCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  passwordResetCodeExpirationHours?: number;
}

export interface UserPermissionSetting {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format int32 */
  tenantId?: number | null;
  /**
   * @minLength 0
   * @maxLength 128
   */
  name: string;
  isGranted?: boolean;
  /** @format int64 */
  userId?: number;
}

export interface UserRiskAndVerificationLevelDto {
  /** @format int64 */
  id?: number;
  verifiedLevel?: KycType;
  riskLevel?: UserRiskLevel;
  status?: UserStatus;
  kycStatus?: UserKYCStatus;
  comment?: string | null;
}

export interface UserRole {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  userId?: number;
  /** @format int32 */
  roleId?: number;
}

export interface UserRoleDto {
  /** @format int32 */
  roleId?: number;
  roleName?: string | null;
  roleDisplayName?: string | null;
  isAssigned?: boolean;
  inheritedFromOrganizationUnit?: boolean;
}

export interface UserStatusDto {
  /** @format int64 */
  id?: number;
  status?: UserStatus;
  comment?: string | null;
}

export interface UserToken {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  tenantId?: number | null;
  /** @format int64 */
  userId?: number;
  /**
   * @minLength 0
   * @maxLength 128
   */
  loginProvider?: string | null;
  /**
   * @minLength 0
   * @maxLength 128
   */
  name?: string | null;
  /**
   * @minLength 0
   * @maxLength 512
   */
  value?: string | null;
  /** @format date-time */
  expireDate?: string | null;
}

export interface UsersToOrganizationUnitInput {
  userIds?: number[] | null;
  /**
   * @format int64
   * @min 1
   */
  organizationUnitId?: number;
}

export interface VerifyAuthenticatorCodeInput {
  code?: string | null;
  googleAuthenticatorKey?: string | null;
}

export interface VerifyEmailInput {
  confirmationCode?: string | null;
}

export interface VerifySmsCodeInputDto {
  code?: string | null;
  phoneNumber?: string | null;
}

export interface WebhookEvent {
  /** @format uuid */
  id?: string;
  /** @minLength 1 */
  webhookName: string;
  data?: string | null;
  /** @format date-time */
  creationTime?: string;
  /** @format int32 */
  tenantId?: number | null;
  isDeleted?: boolean;
  /** @format date-time */
  deletionTime?: string | null;
}

export interface WebhookSubscription {
  /** @format uuid */
  id?: string;
  /** @format int32 */
  tenantId?: number | null;
  webhookUri?: string | null;
  secret?: string | null;
  isActive?: boolean;
  webhooks?: string[] | null;
  headers?: Record<string, string>;
}

export interface Widget {
  widgetId?: string | null;
  /** @format int32 */
  height?: number;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  positionX?: number;
  /** @format int32 */
  positionY?: number;
}

export interface WidgetFilterOutput {
  id?: string | null;
  name?: string | null;
}

export interface WidgetOutput {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  filters?: WidgetFilterOutput[] | null;
}

export interface WithdrawTranasactionListDto {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  userName?: string | null;
  /** @format double */
  amount?: number;
  comment?: string | null;
  paymentStatus?: PaymentStatus;
  /** @format date-time */
  creationTime?: string;
}

export interface WithdrawTransaction {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  creationTime?: string;
  /** @format int64 */
  creatorUserId?: number | null;
  /** @format date-time */
  lastModificationTime?: string | null;
  /** @format int64 */
  lastModifierUserId?: number | null;
  isDeleted?: boolean;
  /** @format int64 */
  deleterUserId?: number | null;
  /** @format date-time */
  deletionTime?: string | null;
  /** @format int64 */
  userId?: number;
  user?: User;
  /** @format double */
  amount?: number;
  comment?: string | null;
  paymentStatus?: PaymentStatus;
}

export interface WsFederationExternalLoginProviderSettings {
  clientId?: string | null;
  tenant?: string | null;
  metaDataAddress?: string | null;
  wtrealm?: string | null;
  authority?: string | null;
}

export interface ApiServicesAppAgoraOrderbookpairsPostParams {
  chainId?: string;
  orderbookAddress?: string;
}

export interface ApiServicesAppAgoraGetordersGetParams {
  chainId?: string;
  orderbookAddress?: string;
  pairId?: string;
  orderIds?: string;
}

export interface ApiServicesAppAgorastatisticsGetusersbywalletGetParams {
  wallet?: string;
}

export interface ApiServicesAppAgorastatisticsGetpairtradesGetParams {
  /** @format int32 */
  PairId?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppAgorastatisticsGetorderbookGetParams {
  /** @format int32 */
  PairId?: number;
  queue_id?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppAssetbalanceGetallGetParams {
  /** @format int64 */
  UserId?: number;
  /** @format int32 */
  DigitalSecurityId?: number;
  /** @format double */
  FromReservedForLimitOrders?: number;
  /** @format double */
  ToReservedForLimitOrders?: number;
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppAssetbalanceGetdatatoexcelGetParams {
  SelectedColumns?: string[];
  /** @format int64 */
  UserId?: number;
  /** @format int32 */
  DigitalSecurityId?: number;
  /** @format double */
  FromReservedForLimitOrders?: number;
  /** @format double */
  ToReservedForLimitOrders?: number;
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppAuditlogGetauditlogsGetParams {
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
  UserName?: string;
  ServiceName?: string;
  MethodName?: string;
  BrowserInfo?: string;
  HasException?: boolean;
  /** @format int32 */
  MinExecutionDuration?: number;
  /** @format int32 */
  MaxExecutionDuration?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppAuditlogGetauditlogstoexcelGetParams {
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
  UserName?: string;
  ServiceName?: string;
  MethodName?: string;
  BrowserInfo?: string;
  HasException?: boolean;
  /** @format int32 */
  MinExecutionDuration?: number;
  /** @format int32 */
  MaxExecutionDuration?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppAuditlogGetentitychangesGetParams {
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
  UserName?: string;
  EntityTypeFullName?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppAuditlogGetentitytypechangesGetParams {
  EntityTypeFullName?: string;
  EntityId?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppAuditlogGetentitychangestoexcelGetParams {
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
  UserName?: string;
  EntityTypeFullName?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppAuditlogGetentitypropertychangesGetParams {
  /** @format int64 */
  entityChangeId?: number;
}

export interface ApiServicesAppBalanceGetallGetParams {
  Filter?: string;
  /** @format int64 */
  UserId?: number;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppBalanceGetdatatoexcelGetParams {
  Filter?: string;
  /** @format int64 */
  UserId?: number;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  SelectedColumns?: string[];
}

export interface ApiServicesAppBlobstorageDeleteimageDeleteParams {
  path?: string;
}

export interface ApiServicesAppCashbalanceGetallGetParams {
  /** @format int64 */
  UserId?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppCashbalanceGetdatatoexcelGetParams {
  /** @format int64 */
  UserId?: number;
  Sorting?: string;
  SelectedColumns?: string[];
}

export interface ApiServicesAppCashpostingGetallGetParams {
  DebitCredit?: DebitCreditType[];
  TransactionType?: CashPostingTranscationType[];
  /** @format double */
  FromFee?: number;
  /** @format double */
  ToFee?: number;
  /** @format double */
  FromTotal?: number;
  /** @format double */
  ToTotal?: number;
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppCashpostingGetdatatoexcelGetParams {
  DebitCredit?: DebitCreditType[];
  TransactionType?: CashPostingTranscationType[];
  SelectedColumns?: string[];
  /** @format double */
  FromFee?: number;
  /** @format double */
  ToFee?: number;
  /** @format double */
  FromTotal?: number;
  /** @format double */
  ToTotal?: number;
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppCategoryGetallGetParams {
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppCategoryDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppCategoryGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppChatGetuserchatmessagesGetParams {
  /** @format int32 */
  TenantId?: number;
  /**
   * @format int64
   * @min 1
   */
  UserId?: number;
  /** @format int64 */
  MinMessageId?: number;
  /** @format int32 */
  MaxResultCount?: number;
}

export interface ApiServicesAppCommonlookupGeteditionsforcomboboxGetParams {
  /** @default false */
  onlyFreeItems?: boolean;
}

export interface ApiServicesAppDashboardcustomizationGetuserdashboardGetParams {
  DashboardName?: string;
  Application?: string;
}

export interface ApiServicesAppDashboardcustomizationDeletepageDeleteParams {
  Id?: string;
  DashboardName?: string;
  Application?: string;
}

export interface ApiServicesAppDashboardcustomizationGetdashboarddefinitionGetParams {
  DashboardName?: string;
  Application?: string;
}

export interface ApiServicesAppDashboardcustomizationGetallwidgetdefinitionsGetParams {
  DashboardName?: string;
  Application?: string;
}

export interface ApiServicesAppDashboardcustomizationGetallavailablewidgetdefinitionsforpageGetParams {
  DashboardName?: string;
  Application?: string;
  PageId?: string;
}

export interface ApiServicesAppDashboardcustomizationGetsettingnameGetParams {
  application?: string;
  dashboardName?: string;
}

export interface ApiServicesAppDashboarddefGetallGetParams {
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppDashboarddefGetforviewGetParams {
  Id?: string;
}

export interface ApiServicesAppDbandcrGetallGetParams {
  Filter?: string;
  /** @format int64 */
  UserId?: number;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppDbandcrGetforviewGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppDbandcrGetdatatoexcelGetParams {
  Filter?: string;
  /** @format int64 */
  UserId?: number;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  SelectedColumns?: string[];
}

export interface ApiServicesAppDemouicomponentsSendandgetdatePostParams {
  /** @format date-time */
  date?: string;
}

export interface ApiServicesAppDemouicomponentsSendandgetdatetimePostParams {
  /** @format date-time */
  date?: string;
}

export interface ApiServicesAppDemouicomponentsSendandgetdaterangePostParams {
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}

export interface ApiServicesAppDemouicomponentsGetcountriesGetParams {
  searchTerm?: string;
}

export interface ApiServicesAppDemouicomponentsSendandgetvaluePostParams {
  input?: string;
}

export interface ApiServicesAppDynamicentitypropertyGetGetParams {
  /** @format int32 */
  id?: number;
}

export interface ApiServicesAppDynamicentitypropertyGetallpropertiesofanentityGetParams {
  EntityFullName?: string;
}

export interface ApiServicesAppDynamicentitypropertyDeleteDeleteParams {
  /** @format int32 */
  id?: number;
}

export interface ApiServicesAppDynamicentitypropertyvalueGetGetParams {
  /** @format int32 */
  id?: number;
}

export interface ApiServicesAppDynamicentitypropertyvalueGetallGetParams {
  EntityId?: string;
  /** @format int32 */
  PropertyId?: number;
}

export interface ApiServicesAppDynamicentitypropertyvalueDeleteDeleteParams {
  /** @format int32 */
  id?: number;
}

export interface ApiServicesAppDynamicentitypropertyvalueGetalldynamicentitypropertyvaluesGetParams {
  EntityFullName: string;
  EntityId: string;
}

export interface ApiServicesAppDynamicpropertyGetGetParams {
  /** @format int32 */
  id?: number;
}

export interface ApiServicesAppDynamicpropertyDeleteDeleteParams {
  /** @format int32 */
  id?: number;
}

export interface ApiServicesAppDynamicpropertyFindallowedinputtypePostParams {
  name?: string;
}

export interface ApiServicesAppDynamicpropertyvalueGetGetParams {
  /** @format int32 */
  id?: number;
}

export interface ApiServicesAppDynamicpropertyvalueGetallvaluesofdynamicpropertyGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppDynamicpropertyvalueDeleteDeleteParams {
  /** @format int32 */
  id?: number;
}

export interface ApiServicesAppEditionGeteditionforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppEditionDeleteeditionDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppEditionGeteditioncomboboxitemsGetParams {
  /** @format int32 */
  selectedEditionId?: number;
  /** @default false */
  addAllItem?: boolean;
  /** @default false */
  onlyFreeItems?: boolean;
}

export interface ApiServicesAppEditionGettenantcountGetParams {
  /** @format int32 */
  editionId?: number;
}

export interface ApiServicesAppExchangeGetallGetParams {
  /** @format int32 */
  DigitalSecurityId?: number;
  Type?: UserExchangeTransactionType[];
  Status?: UserExchangeTransactionStatus[];
  Filter?: string;
  /** @format int64 */
  CreatorUserId?: number;
  /** @format int64 */
  OrderId?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppExchangeGetforviewGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppExchangeGetdatatoexcelGetParams {
  /** @format int32 */
  DigitalSecurityId?: number;
  Type?: UserExchangeTransactionType[];
  Status?: UserExchangeTransactionStatus[];
  Filter?: string;
  /** @format int64 */
  CreatorUserId?: number;
  /** @format int64 */
  OrderId?: number;
  Sorting?: string;
  SelectedColumns?: string[];
}

export interface ApiServicesAppExchangeGetorcreatewalletGetParams {
  assetId?: string;
}

export interface ApiServicesAppExchangeGetcreateorderquoteGetParams {
  contractAddress?: string;
  pairId?: string;
  quantity?: string;
  price?: string;
  slippage?: string;
}

export interface ApiServicesAppFriendshipRemovefriendDeleteParams {
  /**
   * @format int64
   * @min 1
   */
  UserId?: number;
  /** @format int32 */
  TenantId?: number;
}

export interface ApiServicesAppHostdashboardGettopstatsdataGetParams {
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
}

export interface ApiServicesAppHostdashboardGetincomestatisticsGetParams {
  IncomeStatisticsDateInterval?: ChartDateInterval;
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
}

export interface ApiServicesAppHostdashboardGeteditiontenantstatisticsGetParams {
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
}

export interface ApiServicesAppInvoiceGetinvoiceinfoGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppLanguageGetlanguageforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppLanguageDeletelanguageDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppLanguageGetlanguagetextsGetParams {
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  Sorting?: string;
  /** @maxLength 128 */
  SourceName: string;
  /**
   * @minLength 0
   * @maxLength 128
   */
  BaseLanguageName?: string;
  /**
   * @minLength 2
   * @maxLength 128
   */
  TargetLanguageName: string;
  TargetValueFilter?: string;
  FilterText?: string;
}

export interface ApiServicesAppLocalorderGetallGetParams {
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalOrderId?: string;
  Bid?: boolean;
  Cancelled?: boolean;
  Expired?: boolean;
  FillStatus?: FillStatus[];
  /** @format int32 */
  FromRemaining?: number;
  /** @format int32 */
  ToRemaining?: number;
  OperationStatus?: OperationStatus;
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppLocalorderGetorderstoexcelGetParams {
  SelectedColumns?: string[];
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalOrderId?: string;
  Bid?: boolean;
  Cancelled?: boolean;
  Expired?: boolean;
  FillStatus?: FillStatus[];
  /** @format int32 */
  FromRemaining?: number;
  /** @format int32 */
  ToRemaining?: number;
  OperationStatus?: OperationStatus;
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppLocalorderGetforviewGetParams {
  /** @format int64 */
  OrderId?: number;
}

export interface ApiServicesAppLocalordereventhistoryGetallGetParams {
  Bid?: boolean;
  Cancelled?: boolean;
  Expired?: boolean;
  FillStatus?: FillStatus;
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalOrderId?: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalEventOrderId?: string;
  EventTypes?: OrderEventType[];
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppLocalordereventhistoryGetforviewGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppLocalordereventhistoryGetdatatoexcelGetParams {
  SelectedColumns?: string[];
  Bid?: boolean;
  Cancelled?: boolean;
  Expired?: boolean;
  FillStatus?: FillStatus;
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalOrderId?: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalEventOrderId?: string;
  EventTypes?: OrderEventType[];
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppLocaltradeGetallGetParams {
  /** @format int32 */
  PairId?: number;
  /** @format int64 */
  CreatorUserId?: number;
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalTradeId?: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  OrderHistoryId?: string;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppLocaltradeGettradestoexcelGetParams {
  /** @format int32 */
  PairId?: number;
  /** @format int64 */
  CreatorUserId?: number;
  ExchangeId?: string;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  SelectedColumns?: string[];
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalTradeId?: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  OrderHistoryId?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppLocaltradeGetallstatisticGetParams {
  /** @format int32 */
  PairId?: number;
  /** @format int64 */
  CreatorUserId?: number;
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalTradeId?: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  OrderHistoryId?: string;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppLocaltradeGetforviewGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppLocaltradeGetallfeecalculationGetParams {
  /** @format int32 */
  PairId?: number;
  /** @format int64 */
  CreatorUserId?: number;
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalTradeId?: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  OrderHistoryId?: string;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppLocaltradeGetfeecalculationtoexcelGetParams {
  /** @format int32 */
  PairId?: number;
  /** @format int64 */
  CreatorUserId?: number;
  ExchangeId?: string;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  SelectedColumns?: string[];
  /**
   * @minLength 1
   * @maxLength 50
   */
  LocalTradeId?: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  OrderHistoryId?: string;
  CreatorUsers?: number[];
  DigitalSecurities?: number[];
  /** @format date-time */
  CreationTimeFrom?: string;
  /** @format date-time */
  CreationTimeTo?: string;
  /** @format date-time */
  ExpirationTimeFrom?: string;
  /** @format date-time */
  ExpirationTimeTo?: string;
  /** @format double */
  FromPrice?: number;
  /** @format double */
  ToPrice?: number;
  /** @format int32 */
  FromQuantity?: number;
  /** @format int32 */
  ToQuantity?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppMifidtestGetallGetParams {
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppMifidtestDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppMifidtestGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppMifidtestGettestGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppMifidtestGettestdetailGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppMifidtestanswerGetallGetParams {
  Filter?: string;
  /** @format int32 */
  MiFIDTestQuestionId?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppMifidtestanswerDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppMifidtestanswerGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppMifidtestquestionGetallGetParams {
  Filter?: string;
  /** @format int32 */
  MiFIDTestId?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppMifidtestquestionDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppMifidtestquestionGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppNewsGetallGetParams {
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppNewsDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppNewsUnpublishPostParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppNewsUndodraftPostParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppNewsGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppNewsGetnewsbycountGetParams {
  /**
   * @format int32
   * @default 5
   */
  count?: number;
}

export interface ApiServicesAppNewsGetsinglenewsGetParams {
  Slug?: string;
}

export interface ApiServicesAppNewsGetnewsGetParams {
  ExchangePairId?: string;
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppNotificationGetusernotificationsGetParams {
  State?: UserNotificationState;
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppNotificationDeletenotificationDeleteParams {
  /** @format uuid */
  Id?: string;
}

export interface ApiServicesAppNotificationDeleteallusernotificationsDeleteParams {
  State?: UserNotificationState;
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
}

export interface ApiServicesAppNotificationGetalluserforlookuptableGetParams {
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppNotificationGetallorganizationunitforlookuptableGetParams {
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppNotificationGetnotificationspublishedbyuserGetParams {
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
}

export interface ApiServicesAppOrdersmanagementsystemGetopenordersGetParams {
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppOrdersmanagementsystemGetuserordershistoryGetParams {
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppOrdersmanagementsystemGetordersGetParams {
  IsBuy?: boolean;
  IsSell?: boolean;
  IsActive?: boolean;
  IsCompleted?: boolean;
  IsCancelled?: boolean;
  IsExpired?: boolean;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppOrdersmanagementsystemGetorderdetailGetParams {
  /** @format int64 */
  orderId?: number;
}

export interface ApiServicesAppOrdersmanagementsystemGettradesGetParams {
  IsBuy?: boolean;
  IsSell?: boolean;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppOrdersmanagementsystemGetordertradesGetParams {
  /** @format int64 */
  orderId?: number;
}

export interface ApiServicesAppOrdersmanagementsystemGetcontractnoteGetParams {
  /** @format int64 */
  tradeId?: number;
}

export interface ApiServicesAppOrganizationunitGetorganizationunitusersGetParams {
  /**
   * @format int64
   * @min 1
   */
  Id?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppOrganizationunitGetorganizationunitrolesGetParams {
  /**
   * @format int64
   * @min 1
   */
  Id?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppOrganizationunitDeleteorganizationunitDeleteParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppOrganizationunitRemoveuserfromorganizationunitDeleteParams {
  /**
   * @format int64
   * @min 1
   */
  UserId?: number;
  /**
   * @format int64
   * @min 1
   */
  OrganizationUnitId?: number;
}

export interface ApiServicesAppOrganizationunitRemoverolefromorganizationunitDeleteParams {
  /**
   * @format int32
   * @min 1
   */
  RoleId?: number;
  /**
   * @format int64
   * @min 1
   */
  OrganizationUnitId?: number;
}

export interface ApiServicesAppOwnerGetallGetParams {
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppOwnerDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppOwnerGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppPairGetallGetParams {
  Filter?: string;
  IsActive?: boolean;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppPairDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppPairGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppPairGetpairsGetParams {
  /** @format int32 */
  categoryId?: number;
}

export interface ApiServicesAppPairGetsinglepairbyexchangepairidGetParams {
  ExchangePairId?: string;
}

export interface ApiServicesAppPairGetpairsbyownerGetParams {
  /** @format int32 */
  ownerId?: number;
}

export interface ApiServicesAppPairGetdropdownGetParams {
  /** @default "" */
  filter?: string;
}

export interface ApiServicesAppPairdocumentGetallGetParams {
  Filter?: string;
  /** @format int32 */
  PairId?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppPairdocumentDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppPairdocumentGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppPairperkGetallGetParams {
  Filter?: string;
  /** @format int32 */
  PairId?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppPairperkDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppPairperkGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppPairuikeyvalueGetallGetParams {
  Filter?: string;
  /** @format int32 */
  PairId?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppPairuikeyvalueDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppPairuikeyvalueGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppPaymentGetpaymenthistoryGetParams {
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppPaymentGetactivegatewaysGetParams {
  RecurringPaymentsEnabled?: boolean;
}

export interface ApiServicesAppPaymentGetpaymentGetParams {
  /** @format int64 */
  paymentId?: number;
}

export interface ApiServicesAppPaymentPaymentfailedPostParams {
  /** @format int64 */
  paymentId?: number;
}

export interface ApiServicesAppPaypalpaymentConfirmpaymentPostParams {
  /** @format int64 */
  paymentId?: number;
  paypalOrderId?: string;
}

export interface ApiServicesAppPortfolioGetportfolioassetsbyuseridGetParams {
  /** @format int64 */
  UserId?: number;
}

export interface ApiServicesAppPortfolioGetbalancebyuseridGetParams {
  /** @format int64 */
  UserId?: number;
}

export interface ApiServicesAppPortfolioGettelosbalancebyuseridGetParams {
  /** @format int64 */
  UserId?: number;
}

export interface ApiServicesAppPortfolioGetbalancewithoutcachGetParams {
  /** @format int64 */
  userId?: number;
}

export interface ApiServicesAppPortfolioGetassetsbalancewithoutcachGetParams {
  /** @format int64 */
  userId?: number;
  tokenAddress?: string;
}

export interface ApiServicesAppProfileGetfinancialactivityGetParams {
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppProfileGetprofilepicturebyusernameGetParams {
  username?: string;
}

export interface ApiServicesAppProfileGetfriendprofilepictureGetParams {
  /** @format int64 */
  UserId?: number;
  /** @format int32 */
  TenantId?: number;
}

export interface ApiServicesAppProfileGetprofilepicturebyuserGetParams {
  /** @format int64 */
  userId?: number;
}

export interface ApiServicesAppRabbitexchangeorderresponseGetallGetParams {
  /** @format int64 */
  CreatorUserId?: number;
  ExchangeId?: string;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppRabbitexchangeorderresponseGetforviewGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppRabbitexchangetraderesponseGetallGetParams {
  /** @format int64 */
  CreatorUserId?: number;
  ExchangeId?: string;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}

export interface ApiServicesAppRabbitexchangetraderesponseGetforviewGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppRoleGetroleforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppRoleDeleteroleDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppStaticpageGetallGetParams {
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppStaticpageDeleteDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppStaticpageGetforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppStaticpageGetpagebyslugGetParams {
  slug?: string;
}

export interface ApiServicesAppStripepaymentGetpaymentresultGetParams {
  /** @format int64 */
  PaymentId?: number;
}

export interface ApiServicesAppTenantGettenantsGetParams {
  Filter?: string;
  /** @format date-time */
  SubscriptionEndDateStart?: string;
  /** @format date-time */
  SubscriptionEndDateEnd?: string;
  /** @format date-time */
  CreationDateStart?: string;
  /** @format date-time */
  CreationDateEnd?: string;
  /** @format int32 */
  EditionId?: number;
  EditionIdSpecified?: boolean;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppTenantGettenantforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppTenantDeletetenantDeleteParams {
  /** @format int32 */
  Id?: number;
}

export interface ApiServicesAppTenantGettenantfeaturesforeditGetParams {
  /** @format int32 */
  Id?: number;
}

export interface TenantcustomizationGettenantlogoBySkinByTenantidByExtensionGetParams {
  tenantId: string;
  extension: string;
  skin: string;
}

export interface ApiServicesAppTenantdashboardGetdashboarddataGetParams {
  SalesSummaryDatePeriod?: SalesSummaryDatePeriod;
}

export interface ApiServicesAppTenantdashboardGetsalessummaryGetParams {
  SalesSummaryDatePeriod?: SalesSummaryDatePeriod;
}

export interface ApiServicesAppTenantregistrationBuynowsucceedPostParams {
  /** @format int64 */
  paymentId?: number;
}

export interface ApiServicesAppTenantregistrationNewregistrationsucceedPostParams {
  /** @format int64 */
  paymentId?: number;
}

export interface ApiServicesAppTenantregistrationUpgradesucceedPostParams {
  /** @format int64 */
  paymentId?: number;
}

export interface ApiServicesAppTenantregistrationExtendsucceedPostParams {
  /** @format int64 */
  paymentId?: number;
}

export interface ApiServicesAppTenantregistrationGeteditionGetParams {
  /** @format int32 */
  editionId?: number;
}

export interface ApiTestfixgatewayGetbyidGetParams {
  /** @format int64 */
  id?: number;
}

export interface ApiServicesAppTimingGettimezonesGetParams {
  DefaultTimezoneScope?: SettingScopes;
}

export interface ApiServicesAppTimingGettimezonecomboboxitemsGetParams {
  SelectedTimezoneId?: string;
}

export interface ApiTokenauthRefreshtokenPostParams {
  refreshToken?: string;
}

export interface ApiTokenauthImpersonatedauthenticatePostParams {
  impersonationToken?: string;
}

export interface ApiTokenauthDelegatedimpersonatedauthenticatePostParams {
  /** @format int64 */
  userDelegationId?: number;
  impersonationToken?: string;
}

export interface ApiTokenauthLinkedaccountauthenticatePostParams {
  switchAccountToken?: string;
}

export interface ApiTokenauthTestnotificationGetParams {
  /** @default "" */
  message?: string;
  /** @default "info" */
  severity?: string;
}

export interface ApiServicesAppTopupGetallGetParams {
  /** @format int64 */
  UserId?: number;
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppTopupGettotaltopupsGetParams {
  /** @format date-time */
  from?: string;
  /** @format date-time */
  to?: string;
}

export interface ApiTwitterGetaccesstokenPostParams {
  token?: string;
  verifier?: string;
}

export interface ApiServicesAppUicustomizationsettingsChangethemewithdefaultvaluesPostParams {
  themeName?: string;
}

export interface ApiServicesAppUicustomizationsettingsChangedarkmodeofcurrentthemePostParams {
  isDarkModeActive?: boolean;
}

export interface ApiServicesAppUserGetuserstoexcelGetParams {
  Filter?: string;
  Permissions?: string[];
  SelectedColumns?: string[];
  /** @format int32 */
  Role?: number;
  OnlyLockedUsers?: boolean;
  Sorting?: string;
}

export interface ApiServicesAppUserGetuserforeditGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppUserGetuserpermissionsforeditGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppUserDeleteuserDeleteParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppUserGetusersfordropdownGetParams {
  Filter?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppUserdelegationGetdelegatedusersGetParams {
  /** @format int32 */
  MaxResultCount?: number;
  /** @format int32 */
  SkipCount?: number;
  Sorting?: string;
}

export interface ApiServicesAppUserdelegationRemovedelegationDeleteParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppUserinformationGetallGetParams {
  Filter?: string;
  KYCStatus?: UserKYCStatus[];
  Status?: UserStatus[];
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppUserinformationGetuserissuesGetParams {
  /** @format int64 */
  UserId?: number;
  Type?: UserSystemStatusType[];
  Status?: UserStatus[];
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppUserinformationGetuserGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppUserinformationGetuserissueforeditGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppUserinformationGetorcreatewalletGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppUserinformationGetriskandverificationlevelGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppUserinformationGetuserstatusGetParams {
  /** @format int64 */
  Id?: number;
}

export interface ApiServicesAppUserissuemanagerPerformuserissuePostParams {
  /** @format int64 */
  issueId?: number;
}

export interface ApiServicesAppUserlinkGetlinkedusersGetParams {
  /** @format int32 */
  MaxResultCount?: number;
  /** @format int32 */
  SkipCount?: number;
  Sorting?: string;
}

export interface ApiServicesAppUserloginGetuserloginattemptsGetParams {
  Filter?: string;
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
  Result?: AbpLoginResultType;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppUserverificationGetapplicantdataGetParams {
  /** @format int64 */
  metaKycId?: number;
}

export interface ApiServicesAppUserverificationGetallkycattemptGetParams {
  Filter?: string;
  /** @format int64 */
  UserId?: number;
  KYCStatus?: UserKYCStatus[];
  ApplicantStatus?: ApplicantStatus[];
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppUserverificationGetkycattemptsGetParams {
  Filter?: string;
  /** @format int64 */
  UserId?: number;
  KYCStatus?: UserKYCStatus[];
  ApplicantStatus?: ApplicantStatus[];
  Active?: boolean;
  KycType?: KycType[];
  RiskLevel?: UserRiskLevel[];
  /** @format date-time */
  StartDate?: string;
  /** @format date-time */
  EndDate?: string;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppUserverificationGetinvcategorisationGetParams {
  /** @format int64 */
  userId?: number;
}

export interface ApiServicesAppUserverificationGetallkycattemptresultGetParams {
  /** @format int64 */
  AttemptId?: number;
  Sorting?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppUserverificationGetcountriesGetParams {
  filter?: string;
  Type?: GetCountiresType;
}

export interface ApiServicesAppUserverificationGetbranchcategoriesGetParams {
  filter?: string;
  lang?: string;
}

export interface ApiServicesAppUserverificationGetbranchesGetParams {
  /** @format int64 */
  categoryId?: number;
  filter?: string;
  lang?: string;
}

export interface ApiServicesAppUserverificationSetkycresultPostParams {
  body?: string;
}

export interface ApiServicesAppUserverificationSetwatchlistresultPostParams {
  body?: string;
}

export interface ApiServicesAppWebhookeventGetGetParams {
  id?: string;
}

export interface ApiServicesAppWebhooksendattemptGetallsendattemptsGetParams {
  SubscriptionId?: string;
  /**
   * @format int32
   * @min 1
   * @max 1000
   */
  MaxResultCount?: number;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
}

export interface ApiServicesAppWebhooksendattemptGetallsendattemptsofwebhookeventGetParams {
  Id?: string;
}

export interface ApiServicesAppWebhooksendattemptResendPostParams {
  sendAttemptId?: string;
}

export interface ApiServicesAppWebhooksubscriptionGetsubscriptionGetParams {
  subscriptionId?: string;
}

export interface ApiServicesAppWebhooksubscriptionIssubscribedPostParams {
  webhookName?: string;
}

export interface ApiServicesAppWebhooksubscriptionGetallsubscriptionsiffeaturesgrantedGetParams {
  webhookName?: string;
}

export interface ApiServicesAppWithdrawGetallGetParams {
  Filter?: string;
  PaymentStatus?: PaymentStatus[];
  Sorting?: string;
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  SkipCount?: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  MaxResultCount?: number;
}
