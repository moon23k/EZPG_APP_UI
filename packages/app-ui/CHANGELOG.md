# @ezpg/app-ui

## 0.3.0

### Minor Changes

- c4dbf77: 테마 값을 EZPG 공통 토큰 원본(design/base_tokens.json)에서 생성한 theme/base.ts로 읽음. `destructive` 이름을 `danger`로 바꿈: ThemeColors `danger`·`dangerForeground`, Button variant `danger`, StatusBadge·Toast tone `danger`, Dialog `danger` prop.

## 0.2.0

### Minor Changes

- 817e226: 새 부품 GenerationProgress · ProgressBar · SelectionBar · BulkShipList(trackingIssues 포함).

  깨지는 변경
  - OrderStatus · orderStatusLabel 키를 API 상태 문자열 7종(pending_payment · paid · preparing · shipped · delivered · completed · canceled)으로 바꿈. 취소·반품·교환 요청 계열 키 삭제.
  - ClaimRow 상태 7종(requested · collecting · collected · held · completed · rejected · withdrawn), reason 선택, onApprove · onReject 삭제(행은 onPress로 상세만 엶), dueInDays 대신 dueAt으로 D-n 계산. claimStatusLabel 추가.

  확장
  - OrderCard · Card onLongPress · selected, Chip · ChipGroup count, Field hint · warning, SitePreviewFrame publishDisabled · blockedReason.
  - PlanCard 상태 none · trial, PlanCard · CreditWallet dailyLimit null(무제한).
  - ServiceStateBanner stopped · reason, OptionEditor onActiveChange · note.

  수정
  - 다크 테마 Switch 색, ImageGrid 업로드 실패 표시, LineChart 세로축 라벨 폭, OptionEditor 음수 가격 표시.
  - src 주석 삭제와 주석 검사(lint).

## 0.1.0

### Minor Changes

- d816bb2: 첫 공개 배포
