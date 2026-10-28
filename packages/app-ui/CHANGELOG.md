# @ezpg/app-ui

## 0.5.0

### Minor Changes

- ac190f6: Group(제목 · 옆 글자 · 내용 묶음, 질문 화면 안의 묶음용). ResultTemplate — 미리보기 render(mode: 'card' | 'full'), 미리보기 1개면 점 숨김, 진행 중에도 호출하는 쪽이 준 하단 행동을 보여 줌(실패 · 다시 만들기).

## 0.4.0

### Minor Changes

- 2817c7b: DS2 역할 토큰 — 글자 단계 label(14/20) · screenTitle(24/32), layout(화면 여백 · 묶음 간격), controlSize · headerHeight · listRowHeight 추가. 부품 안 숫자 글자 크기 27곳 · 간격 · 모서리 · 높이를 토큰으로 교체(13 → 14, 16 → 17, 18 → 20, 36 → 28, 간격 4 단위, 모서리 10 → 8 · 12), StepScreen 제목과 본문 사이 20 → 24. 숫자 글자 크기 · 간격 · 모서리 lint 추가.
- e468e14: DS3 토큰 보정 — layout.screenX 20 → 16, listRowHeight → listRow { oneLine 56 · twoLine 72 · threeLine 88 }(Material 3 목록).
- fc79451: DS3 화면 템플릿 9종 시안(src/templates, 아직 내보내지 않음)과 기준 스토리. ListRow — overline(윗줄) · 두 줄 72 · 세 줄 88 높이 · 제목 bodyLg · 설명 label · 좌우 screenX. Field — 단위(trailing)가 있을 때 입력이 줄어들지 않아 단위 글자가 깨지던 문제(minWidth 0).
- 8aa08c9: DS4 화면 템플릿 내보내기 — ListTemplate · ResultTemplate · DetailTemplate · FormTemplate · MenuTemplate · DashboardTemplate · EditorTemplate · SystemTemplate · ListSection과 타입(TemplateAction · TemplateNotice · NoticeReason 등). 보조 문구는 notice 자리 하나, 사유는 error · money · irreversible · legal만. 동작 테스트 11개.
- 8626eb5: DS5 패턴 정리 — ListTemplate 빈 · 오류 화면을 EmptyState로, 기한 색 한 규칙(평소 muted · 오늘 마감 warningText · 지남 danger, deadlineTone), Text tone warning, Field 경고 테두리 · 아이콘 warningText(비텍스트 대비 3:1), 주문 상태 이름을 손님 웹과 같은 말로(상품 준비 중 · 주문 취소, orderStatusText: 입금 대기 · 픽업 준비 완료 · 수령 완료), orderStatusTone, OrderFulfillment에 visit.
- 0887336: StepScreen notice — 질문 화면에도 보조 문구 자리 하나(사유 error · money · irreversible · legal).
- a8122c3: 부품 규칙 통일: Button variant `solid` → `primary`, ButtonVariant · ButtonSize · StatusBadgeTone · ToastTone을 공통 규칙(theme/contract.ts, design/contract.json 생성)에서 가져옴.
- 597ebb9: ThemeColors `warningText` 추가(light #b45309 · dark #fbbf24). 경고를 글자 · 아이콘으로 쓸 때 사용, `warning`은 채움 배경 전용.

### Patch Changes

- 7e926f0: danger(light)를 #dc2626에서 #b91c1c(red-700)로 바꿈. 연한 빨강 바탕(#fef2f2) 위 대비 4.41 → 5.91.

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
