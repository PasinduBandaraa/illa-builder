import { forwardRef, useCallback, useState } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@illa-design/date-picker"
import { InvalidMessage } from "@/widgetLibrary/PublicSector/InvalidMessage"
import { WrappedDateProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedDate = forwardRef<any, WrappedDateProps>((props, ref) => {
  const {
    value,
    dateFormat,
    placeholder,
    showClear,
    required,
    minDate,
    disabled,
    maxDate,
    readOnly,
    hideValidationMessage,
    colorScheme,
    handleUpdateDsl,
  } = props

  const [currentValue, setCurrentValue] = useState(value)

  const checkRange = useCallback(
    (current) => {
      const beforeMinDate = minDate
        ? !!current?.isBefore(dayjs(minDate))
        : false
      const afterMaxDate = maxDate ? !!current?.isAfter(dayjs(maxDate)) : false
      return beforeMinDate || afterMaxDate
    },
    [minDate, maxDate],
  )

  return (
    <div css={containerStyle}>
      <DatePicker
        colorScheme={colorScheme}
        format={dateFormat}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        allowClear={showClear}
        disabledDate={checkRange}
        // todo @aoao handleUpdateDsl?
        onClear={() => {
          setCurrentValue("")
          handleUpdateDsl({ value: "" })
        }}
        onChange={(value) => {
          setCurrentValue(value)
          handleUpdateDsl({ value })
        }}
      />
      <InvalidMessage
        value={currentValue}
        required={required}
        hideValidationMessage={hideValidationMessage}
      />
    </div>
  )
})

WrappedDate.displayName = "WrappedDate"

export const DateWidget = WrappedDate