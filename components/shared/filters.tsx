import React from "react";
import {cn} from "@/lib/utils";
import {Title} from "@/components/shared/title";
import {FilterCheckbox} from "@/components/shared/filter-checkbox";
import {Input} from "@/components/ui";
import {RangeSlider} from "@/components/shared/range-slider";
import {CheckboxFiltersGroup} from "@/components/shared/checkbox-filters-group";

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
    return (
        <div className={cn('', className as string)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1"/>
                <FilterCheckbox text="Новинки" value="2"/>
            </div>

            <div className="mt-5 border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0}/>
                    <Input type="number" placeholder="1000" min={100} max={1000} defaultValue={500}/>
                </div>

                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]}/>

                <CheckboxFiltersGroup
                    title="Ингредиенты"
                    className="mt-5"
                    limit={6}
                    defaultItems={[
                        {
                            text: 'Сырный соус',
                            value: '1'
                        },
                        {
                            text: 'Моцарелла',
                            value: '2'
                        },
                        {
                            text: 'Чеснок',
                            value: '3'
                        },
                        {
                            text: 'Соленые огурчики',
                            value: '4'
                        },
                        {
                            text: 'Красный лук',
                            value: '5'
                        },
                        {
                            text: 'Томаты',
                            value: '6'
                        },
                    ]}
                    items={[
                        {
                            text: 'Сырный соус',
                            value: '1'
                        },
                        {
                            text: 'Моцарелла',
                            value: '2'
                        },
                        {
                            text: 'Чеснок',
                            value: '3'
                        },
                        {
                            text: 'Соленые огурчики',
                            value: '4'
                        },
                        {
                            text: 'Красный лук',
                            value: '5'
                        },
                        {
                            text: 'Томаты',
                            value: '6'
                        },
                        {
                            text: 'Чеснок',
                            value: '7'
                        },
                        {
                            text: 'Соленые огурчики',
                            value: '8'
                        },
                        {
                            text: 'Красный лук',
                            value: '9'
                        },
                        {
                            text: 'Томаты',
                            value: '10'
                        },
                        {
                            text: 'Чеснок',
                            value: '11'
                        },
                        {
                            text: 'Соленые огурчики',
                            value: '12'
                        },
                        {
                            text: 'Красный лук',
                            value: '13'
                        },
                        {
                            text: 'Томаты',
                            value: '14'
                        },
                    ]}
                />

            </div>
        </div>
    )
}
