package com.ayaz.backend.models;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ChartDto {
    public ChartDto() {
        name=new LinkedList<>();
        kol=new LinkedList<>();
    }
    public List<Integer> getKol() {
        return kol;
    }

    public void setKol(List<Integer> kol) {
        this.kol = kol;
    }

    public List<String> getName() {
        return name;
    }

    public void setName(List<String> name) {
        this.name = name;
    }

    public List<Integer> kol;
    public List<String> name;
}
