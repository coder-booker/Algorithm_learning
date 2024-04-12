#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> res = {1, 2, 3};
    // vector<int>::iterator i = res.end()-1;
    // vector<int>::iterator b = res.begin()-1;
    // b = i;
    int i = 0;
    int j = 0;
    for ( i = 0, j; i < 5; ++i, ++j ) {
        cout << i << j << endl;
    }
    
    return 0;
}